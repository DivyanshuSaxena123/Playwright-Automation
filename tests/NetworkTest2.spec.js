/*
In this we will learn about test where need to verify whether we are getting unauthorized error or not when we are trying to access the orderID some other user
Let say we have two users - user1 and user2 and both users have placed some orders and both users have different orderID and now when trying to fetch details of user1 OrderId
but some hacker tweak the orderID of user1 and the we should get "Unauthorized" error
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






test('Security Testing', async({page})=>{
//Now we can bypass login step by directly injecting token. Now we cannot pass directly we have to use "addInitScript" method
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value); // here we are setting the token in the local storage and then we can use that token to login to the application without entering the credentials. and this method will execute before the page is loaded and then we can use that token to login to the application without entering the credentials.
    },response.token); // this will add the script to the page before it is loaded and then we can use that script to inject the token in the local storage. and this method will execute before the page is loaded and then we can use that token to login to the application without entering the credentials.
    await page.goto("https://rahulshettyacademy.com/client/");

    //click on my orders button
    await page.locator("button[routerlink*='myorders']").click();// it might take some time to load 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => 
            route.continue(
                {
                    url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69f05ae9f86ba51a658ddbe1'
                }
            )) // here we are intercepting the API call which is made when we click on view button and then we are tweaking the orderID in that API call and then we will check whether we are getting "Unauthorized" error or not. and this will help us to test the security of our application.
  
    //clcik on view button
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");



});