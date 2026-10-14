import{test, expect} from '@playwright/test';
import { PageObjectManager } from '../pageobject_ts/PageObjectManager';
import {customTest} from '../utils_ts/test-base';
//In order to use data from json 1.First import the json file 2. Then we have to convert json to javascript object using Json.parse("import json file") (Note: If json has some other encoding like utf something then it will throw some therefore for that we have to first convert "Json -> String -> JavaScript Object")
const testData = JSON.parse(JSON.stringify(require('../utils/ECommerceTestData.json')));

//In EcommercePO3 we have seen how we can user json to import data into our test case. but at that we are running test case with 1 dataSet now let say we have to run same test case with multiple dataSets

//now only change in the code will be . we will run "for loop" outside the test case. as now "data" is an array of objects and we have to run test case for each object in the array. so, we will run "for loop" outside the test case and then we will pass each object in the array to the test case as an argument and then we will use that argument in the test case to perform actions on the application and then we will verify those actions.
//how we will differentiate b/w testcase since it will run 2 times with different dataSet so, we will use "data.productName" in the test case name to differentiate b/w test cases. 


//Note - we can send data as a Fixture as well let see in "ECommercePO5.spec.js" 
for(const data of testData)
{
test(`ECommercePO4:${data.productName}`, async({page})=>{
    
    const poManager = new PageObjectManager(page, expect);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.validLogin(data.Email,data.Password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartItem();
    await cartPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillCardDetails(data.cardCvv, data.cardName, data.couponCode, data.country, data.Email);
    await checkoutPage.navigateToOrderSummary();

    const orderSummaryPage = poManager.getOrderSummaryPage();
    const reponse = await orderSummaryPage.verifyOrderSummary(data.orderSummaryText);
    await orderSummaryPage.navigateToOrderListPage();

    const orderListPage = poManager.getOrderListPage();
    await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(reponse.orderId);


});
}



//-------EComercePO5 in typescript

customTest('ECommercePO5: Fixture', async({page, testDataForOrder})=>{
    
        
        const poManager = new PageObjectManager(page, expect);
        const loginPage = poManager.getLoginPage();
        await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
        await loginPage.validLogin(testDataForOrder.Email,testDataForOrder.Password);
    
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
    
        const cartPage = poManager.getCartPage();
        await cartPage.verifyCartItem();
        await cartPage.navigateToCheckout();
    
        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.fillCardDetails(testDataForOrder.cardCvv, testDataForOrder.cardName, testDataForOrder.couponCode, testDataForOrder.country, testDataForOrder.Email);
        await checkoutPage.navigateToOrderSummary();
    
        const orderSummaryPage = poManager.getOrderSummaryPage();
        const reponse = await orderSummaryPage.verifyOrderSummary(testDataForOrder.orderSummaryText);
        await orderSummaryPage.navigateToOrderListPage();
    
        const orderListPage = poManager.getOrderListPage();
        await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(reponse.orderId);
    
    
    });
    


