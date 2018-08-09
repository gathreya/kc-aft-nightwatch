# KC Nightwatch AFTs
These AFTs are run against a verify environment in our Jenkins and EBS pipelines.
The PD test suite is currently disabled in master, and is not run in Jenkins.
The version that runs on EBS can be found in the [coreLoginProposalDev](https://github.com/KualiCo/kc-aft-nightwatch/tree/coreLoginProposalDev) branch.

## Running locally in standalone mode
```
NIGHTWATCH_BASE_URL=https://goblins-verify.kuali.co/res npm run test-local
```

## Running locally through Browserstack
```
NIGHTWATCH_BASE_URL=https://goblins-verify.kuali.co/res \
BROWSERSTACK_USERNAME=<user> \ 
BROWSERSTACK_ACCESS_KEY=<key> \
NODE_ENV=dev \
npm test
```

## Running a specific test
```
npm run test-local -- --test tests/proposalDevelopment.js --testcase "PD test"
```
