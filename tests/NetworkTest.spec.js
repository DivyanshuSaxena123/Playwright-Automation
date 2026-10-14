//---------------------------------------Section 12 - Lecture 68,69---------------------------------------------------

/*
In this we laern about how to mock api. Meaning
Let say we have an application in which we have to test when user has not place any order therefore, it will show "No Orders" message on Order screen.
1) Genrally, we will use fresh user which has not placed any order but what if we some other test before exexcuting this test has all ready placed order then in that it will fail.
2) We login with user in application go to order if user has previous orders then we will delete those orders and then we will execute our test case but it is time consuming process.

so, what we notice that when check "netwok logger" that "No Orders" message is coming from the API response and not from the UI. so, we can mock that API response and then we can test that "No Orders" message is coming or not.
in this way we dont have to make new user and nor we have to delete the previous orders of that user. and it will save our time and also it will make our test case more stable because we are not depending on the data of the user.


while running this text case we might get error call "Request Context Denied". this happend bcz we are passing fake response after fetching the original response
but there is slight delay in fetching original response if we apply page.pause after clicking orders then it will not show error or "await page.waitForResponse()""

-> await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*' , we are using * instead of id bcz we should not hardcode anything - https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/625f9c8e7a1bfc04e65d5c9 here we are hardcoding id therefore we will (*) instead of id
*/


const {test, expect, request} = require('@playwright/test');

const{APIUtils} = require('../utils/APIUtils');  //Now in order to use APIUtils class methods we need to import that class in this test file

const loginPayload = {userEmail:"divyanshusaxena41@gmail.com", userPassword:"Test@123"};
const orderPayload = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayload = {data:[],message:"No Orders"}; // it act javascript object

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
    await page.pause();
    
    const emailID = "divyanshusaxena41@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");

    //now before click orders we will mock the API by using "route" this will route the api the way we want
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', 
        async route => 
        {
            let body = JSON.stringify(fakePayload); //we cannot directly pass the fakePayload bcz it requires "body" that is why we are storing fakePayload in body variable. here we are converting the fakepayload to Json object using "JSON.stringify" method and then we are passing that body to the route.fulfill method. and this will help us to mock the API response and then we can test that "No Orders" message is coming or not.
            const response = await page.request.fetch(route.request()); // here we are fetching the real response of the API and then we will modify that response and then we will send that modified response to the browser. and this will help us to test the scenario when user has not placed any order and it will show "No Orders" message on Order screen.
            route.fulfill(    // this line is basically passing response to browser
                {
                    response,
                    body
                }
            )
            //intercepting response means -> Api will give back response and we will send this reponse to -> {instead of real reponse we will send fake reponse} -> browser -> render the data on frontend

        }
    );
    //Now here are creating order using API and we have orderId and now we will verify that orderId in the UI. and if it is present in the UI then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.

     //click on my orders button
     await page.locator("button[routerlink*='myorders']").click();// it might take some time to load 
     await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'); // here we are waiting for the response of the API and then we will check that "No Orders" message is coming or not. and this step is important because if we do not wait for the response then it will check for the "No Orders" message before the API response is received and it will fail the test case. and if we wait for the response then it will check for the "No Orders" message after the API response is received and it will pass the test case.

     //as you can see we should not hardcode anything - https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/625f9c8e7a1bfc04e65d5c9 here we are hardcoding id therefore we will (*) instead of id
     
     //assertion that we have landed on order page
     console.log(await page.locator('.mt-4').textContent());
});
