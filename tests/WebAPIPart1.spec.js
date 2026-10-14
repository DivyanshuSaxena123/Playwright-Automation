//----------------------------------------------Section 11 - Lecture 56------------------------------------------------


/*
In this we will learn about the Web API testing using Playwright.
Ex -  Let say we  hit an URL and login into that application and if we hit same url in another window in browser 
it will not ask for login credentials because we have already logged in and it will store the cookies and session in the browser. 
To, see those cookie we will store the we will inspect the page and go to application tab and then we will see the cookies and session storage.

But if we hit the same url in incognito mode then it will ask for login credentials because in incognito mode the cookies and session storage are not stored in the browser.
but if, we pass token "localStorage" to browser application tab then it will store the token in the local storage and then we can use that token to login to the application without entering the credentials.

So, here we will learn how to fetch the token from the local storage and then we will use that token to login to the application without entering the credentials. and then we will perform some actions on the application and then we will verify those actions.


Note - Here i want to add 1 more thing is that playwright inspect is mainly used for web ui based application but what if we have to debug api also like in this test case
only 2 things to remember 
1) There should be launch.json file  present in project. What are details require to input in file we make use of AI for that and for
launch.json to work it package.json also had be to configure properly with respect to launch.json we can use AI for this too.

Command to see all detailed api logs in  terminal -  DEBUG=pw:api npx playwright test ./tests/WebAPIPart1.spec.js
*/




const {test, expect, request} = require('@playwright/test');

const{APIUtils} = require('../utils/APIUtils');  //Now in order to use APIUtils class methods we need to import that class in this test file

const loginPayload = {userEmail:"divyanshusaxena41@gmail.com", userPassword:"Test@123"};
const orderPayload = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;
// As name suggest "beforeAll" will execute before all the test cases
test.beforeAll(async({browser})=>
{
    //Login Api    
    const apiContext = await request.newContext();
    const apiutils = new  APIUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayload);

});






test('Web API Testing', async({page})=>{

    //Now we can bypass login step by directly injecting token. Now we cannot pass directly we have to use "addInitScript" method
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value); // here we are setting the token in the local storage and then we can use that token to login to the application without entering the credentials. and this method will execute before the page is loaded and then we can use that token to login to the application without entering the credentials.
    },response.token); // this will add the script to the page before it is loaded and then we can use that script to inject the token in the local storage. and this method will execute before the page is loaded and then we can use that token to login to the application without entering the credentials.
    
    
    const emailID = "divyanshusaxena41@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");

    //Now here are creating order using API and we have orderId and now we will verify that orderId in the UI. and if it is present in the UI then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.

     //click on my orders button
     await page.locator("button[routerlink*='myorders']").click();// it might take some time to load 
     await page.locator("tbody").waitFor(); 
 
     //assertion that we have landed on order page
     await expect(page.locator('div h1')).toHaveText("Your Orders");


     //Now we fetch all order 
    const allOrders = page.locator('tbody tr');
    const count3 = await allOrders.count();
    for(let m=0; m<count3; m++){
        if (response.orderID.includes(await allOrders.nth(m).locator('th').textContent())) { // here we are checking whether the orderId which we have grabbed is present in the order page or not. and if it is present then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.
            //clcik on view button
            await allOrders.nth(m).locator("button").first().click(); // here we are using ".." to go up to the parent element and then we are locating the button inside that parent element and then we are clicking on that button. and this button is the view button for that order.
            break;
        }
    }

    const orderIdDetails = await page.locator('.col-text').textContent(); // here we are grabbing the orderId details from the order details page and then we will compare it with the orderId which we have grabbed from the order confirmation page. and if it is same then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.    
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();

});
