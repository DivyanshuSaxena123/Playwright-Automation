//----------------------------------Section 13 , Lecture - 74, 75, 76 ---------------------------------------------------

/* In this section we will learn about custom fixture and how to use it in our test cases.
Fixture is a reusable unit of code that can be used across multiple test cases. It can be used to set up the test environment, initialize variables, and perform common actions like login, logout, etc.
In this we will create a custom fixture that will contain all the data that we need to use in our test cases. and we can use that fixture in our test cases to perform those actions instead of writing the same code again and again in our test cases. This will help us to reduce the code duplication and also it will make our test cases more readable and maintainable.

We can create a custom fixture by using "test.extend" method. and we can define the fixture in that method. and we can use that fixture in our test cases by importing that fixture in our test cases. and we can use that fixture in our test cases by using "test.use" method. and we can use that fixture in our test cases by using "testDataForOrder" variable. and we can access the data of that fixture by using "testDataForOrder" variable.
We can use fixure for data driven test also.

Note :- While creating custom fixture all the steps before "await use()" will be executed before test like it will act as "beforeAll" or "perSetUp" and
then it will execute the test and then after the test is completed the steps after "await use()" will be executed like it will act as "afterAll" or "tearDown". 
*/

const {expect} = require('@playwright/test');
const {customtest} = require('../utils/fixture'); // here we are importing the custom fixture that we have created in the test-base.js file. and we can use that fixture in our test cases by using "customtest" variable. and we can access the data of that fixture by using "customtest" variable.


customtest('Custom Fixture Demo', async({authenticatedPage, createOrder, testDataForOrder})=>{

    await authenticatedPage.goto('https://rahulshettyacademy.com/client/');
    await authenticatedPage.locator('button[routerlink*="myorders"]').click();
    await authenticatedPage.locator('tbody').waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderID)).toBeVisible(); // here we are using the orderID that we have created in the createOrder fixture and we are verifying that orderID is visible in the UI or not. and if it is visible then the test will pass otherwise it will fail.
    console.log(testDataForOrder.productName); // here we are accessing the data of the fixture that we have created in the test-base.js file. and we can use that data in s the data of that fixture by using "testDataForOrder" variable.

})