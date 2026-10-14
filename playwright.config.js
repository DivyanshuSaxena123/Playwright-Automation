// @ts-check
const {defineConfig, devices} = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  /*
  1) testDir is the directory where the test files are located. By default, it is set to './tests', but you can change it to any directory you want. 
  In this case, we have set it to './tests' because we have created a folder named "tests" in our project directory and we will be writing all our test files in that folder
  and if we want to run a specific test from that folder then we can write like "./tests/filename.spec.js" and we can run via command from termial will talk about it later.

  2) If we do not give any wait time then by default Playwright will wait for 30 seconds for the element to be present before throwing an error. But if we want to change the default wait time then we can use the "timeout" property in the configuration file and set the desired wait time in milliseconds. 
  For example, if we want to set the wait time to 60 seconds,then we can write "timeout: 60000" in the configuration file.
  */
  testDir: './tests',
  timeout: 60000,
  expect: {
    // Expect a condition to be met within 5 seconds.
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on', // let say if we want to capture screenshot only on test case faliure. "screenshot: only-on-faliure"
    trace: 'on' //"on" will store every test case zip in this way it will consume memory. Now if we want to have only failed cases report then - traces: 'retained-on-failure'

  },

 
});
module.exports = config

