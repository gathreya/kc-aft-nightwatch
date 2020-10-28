const axios = require('axios')
const ServiceAgent = require('service2service')
const fs = require('fs')

let pdfClient = undefined

const getPdfClient = () => {
  if (pdfClient === undefined) {
    const agent = new ServiceAgent({
      secret: process.env.PDF_SECRET || 'changeme'
    })

    const newClient = axios.create({ baseURL: 'https://greendale-verify.kuali.co/api/v1/pdf' })
    newClient.interceptors.request.use(async request => {
      return {
        ...request,
        headers: {
          ...request.headers,
          Authorization: (await agent.generate()),
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        }
      }
    })
    newClient.interceptors.response.use(
      response => response,
      error => {
        if (error && error.response && error.response.status === 404) {
          return { data: [] }
        }

        return Promise.reject(error)
      }
    )
    pdfClient = newClient
  }
  return pdfClient
}

const COMPLETE_STATUSES = ['SUCCESS', 'FAIL']

const checkPdfStatus = (jobId, timeLeft = 30000) => {
  const delay = 200
  return new Promise(async (resolve, reject) => {
    if (timeLeft < 0) {
      return reject(new Error(`Job ${jobId} timed out`))
    }
    try {
      const statusRequest = await getPdfClient()
        .get(`/jobs/${jobId}`)
        .then(r => r.data)
      if (statusRequest && COMPLETE_STATUSES.includes(statusRequest.status)) {
        return resolve(statusRequest)
      }
      setTimeout(() => {
        checkPdfStatus(jobId, timeLeft - delay).then(resolve, reject)
      }, delay)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

const flattenPdf = async (sourcePath, destinationPath) =>
  getPdfClient().post('/jobs', {
    actions: [
      {
        actionId: 'flatten',
        name: 'acroFormFlatten',
        source: {
          url: sourcePath
        }
      }
    ]
  })
    .then(r => r.data)
    .then(checkPdfStatus)
    .then(pdfStatus => {
      if (pdfStatus.status === 'SUCCESS') {
        return axios({
          method: 'get',
          url: pdfStatus.actions[0].target.url,
          responseType: 'stream'
        })
          .then(r => new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream('/tmp/flattening')
            let error = null
            r.data.on('error', err => {
              error = err
              reject(err)
            })
            r.data.pipe(writeStream)
            writeStream.on('error', err => {
              error = err
              reject(err)
            })
            writeStream.on('close', () => {
              if (!error) resolve(true)
            })
          }))
          .then(() => fs.renameSync('/tmp/flattening', destinationPath))
          .then(() => true)

      } else {
        console.log(pdfStatus)
        return Promise.reject(`Job returned ${pdfstatus.status}`)
      }
    })

module.exports = {
  flattenPdf
}