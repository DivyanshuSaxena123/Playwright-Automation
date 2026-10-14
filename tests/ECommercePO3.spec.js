const {test, expect} = require('@playwright/test');
const {PageObjectManager} = require('./pageobjects/PageObjectManager');
//In order to use data from json 1.First import the json file 2. Then we have to convert json to javascript object using Json.parse("import json file") (Note: If json has some other encoding like utf something then it will throw some therefore for that we have to first convert "Json -> String -> JavaScript Object")
const testData = JSON.parse(JSON.stringify(require('../utils/ECommerceTestData.json')));

//In this we are harding our data instead we have made json present in utils folder we will use that

test.only('ECommercePO3', async({page})=>{

    
    const poManager = new PageObjectManager(page, expect);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.validLogin(testData.Email,testData.Password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(testData.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartItem();
    await cartPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillCardDetails(testData.cardCvv, testData.cardName, testData.couponCode, testData.country, testData.Email);
    await checkoutPage.navigateToOrderSummary();

    const orderSummaryPage = poManager.getOrderSummaryPage();
    const reponse = await orderSummaryPage.verifyOrderSummary(testData.orderSummaryText);
    await orderSummaryPage.navigateToOrderListPage();

    const orderListPage = poManager.getOrderListPage();
    await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(reponse.orderId);


});


