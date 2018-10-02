# KC Nightwatch AFTs
These AFTs are run against a verify environment in our Jenkins and EBS pipelines.

## Running locally in standalone mode
```
NIGHTWATCH_BASE_URL=https://goblins-verify.kuali.co/res \
SAMPLE_PDF=<path/to/pdf/file> \
npm run test-local
```

## Running locally through Browserstack
```
NIGHTWATCH_BASE_URL=https://goblins-verify.kuali.co/res \
BROWSERSTACK_USERNAME=<user> \ 
BROWSERSTACK_ACCESS_KEY=<key> \
NODE_ENV=development \
npm test
```

## Running against a non-Core Auth environment
```
NIGHTWATCH_BASE_URL=https://res-tst1.kuali.co/kc-dev \
USE_CORE_AUTH=false \
npm run test-local
```

## Running a specific test
```
npm run test-local -- --test tests/proposalDevelopment.js --testcase "PD test"
```
