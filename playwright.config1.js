//As we know that we have already have "playwright.config.js" file in our project but we want to create another config file with some different configuration so, we will create "playwright.config1.js" file and we will export the configuration from this file and we can use this config file to run our tests.
//in playwright we can have multiple config file  as per our requirement let say we want to run same test cases in different browsers or borwser instad of chaging in main config file we will create a different config file


//Command to run test with different config file - "npx playwright test tests/ECommercePO5.spec.js --config playwright.config1.js "
//Command to run a test case with specific config present in project - "npx playwright test tests/ECommercePO5.spec.js --config playwright.config1.js --project=safari"



//------------------------------------Notes-------------------------------
/*
There are some  properties in playwright for config that can be used in daily automation testing

1) "viewport" - In this property we give dimesiion or size . and browser will open in that size
2) "ignoreHttpsError" - This will help in proceeding with "SSL" certified error website.
3) "permission:['geolocation']" - Sometime as we know that websote ask for location permission
4) "...devices['Galaxy A55']" - Suppose we want to run test case iand want the browser to open in an iphone format or android format
5) "video" - now, it has 4 values for it - on, off, retain-on-faliure, on-first-retry
   "retain-on-faliure" - It will record video for each test but will remove all the videos from successful test run
   "on-first-retry" - Record only video when retrying a test for first time

6) "retries" - It basically help in rerun the failed test agian depending on count give like for ex - "retries:1" then it will rerun the failed test cases 1 more time. As we know that during automation execution it always some test case run at first attempt but failed at 2nd attempt  

7) In playwright "Test File will trigger in parallel but individual test cases present in file will run sequentially". By default playwright will execute in 5 workers. Each wroker represent 1 file. we can chage the workers also. so, by default playwright supports running test in parallel
8) "workers" : It help how many test file should run parallely by default this value is 5
9) Note :- There is also a way in which we can trigger test case present in file parallely ideally it will run sequentially in that particular file above all test cases enter this - "test.describe.configure({mode:'parallel'});", similarly there is another mode i.e - "test.describe.configure({mode:'serial'});"
10) Now, we can use tagName to run our test case just like that suppose we have 17 test files and each test file has 2-3 test cases but we want to run test cases with "ci" . command to run -> npx playwright test --grep "@CI" 
11) Now, there 1 more important feature is reporting - till now whatever test we have executed it has generate only HTML report. But if we want to genrate report that looks good we  will use "Allure". first we need to install the plugin - "npm i -D @playwright/test allure-playwright"
    After installing the plugin we , will run our test cases -> "npx playwright test --grep "@CI" --reporter=line,allure-playwright" , as soon as test cases run is complete you will see a folder "allure result" but it is not readable format, so we have to another command

    2nd Command -> "allure generate ./allure-result --clean" it will generate a folder called - "allure-report"
    3rd Command -> "allure open ./allure-report"

    now, here you must be wondering why "reporter=line" it will generate the result in plain text and allure will text plain report to generate its own report
12) We can customize our script as well as per requirement see "package.json" file under "scripts" we have "regression", "ciTestCase" etc. now , to just these case via package.json we need to command like -> "npm run regression" or "npm run ciTestCases"
*/

// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', // we have given the path of test cases folder where all the test cases are present.Now if we want to run particular test case then we can give the path of that particular test case file like - "testDir: './tests/ECommercePO5.spec.js' "
  retries: 1,
  workers: 3,
  timeout: 60000,
  expect: {
    // Expect a condition to be met within 5 seconds.
    timeout: 5000
  },
  reporter: 'html',
  //since we have added projects in this file. Now, our test case will run in both browsers - Safari and Chrome.
  projects:[
    {
        name: 'Safari',
        use: {
            browserName: 'webkit',
            headless: true,
            screenshot: 'on',
            trace: 'on', //"on" will store every test case zip in this way it will consume memory. Now if we want to have only failed cases report then - traces: 'retained-on-failure'
            ...devices['iPhone 11']
        }

    },
    {
        name: 'Chrome',
        use: {
            browserName: 'chromium',
            headless: false,
            screenshot: 'on',
            trace: 'on', //"on" will store every test case zip in this way it will consume memory. Now if we want to have only failed cases report then - traces: 'retained-on-failure'
            //viewport: {width:750, height:780},
            ignoreHttpsError: true,
            permission:['geolocation'],
            ...devices['Galaxy A55'],
            video: 'retain-on-faliure'
        
        }
    }
  ]
  

 
});
module.exports = config

