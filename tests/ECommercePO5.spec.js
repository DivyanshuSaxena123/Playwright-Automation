const {test, expect} = require('@playwright/test');
const{customtest} = require('../utils/test-base');
const {PageObjectManager} = require('./pageobjects/PageObjectManager');


    customtest.only('ECommercePO5: Fixture', async({page, testDataForOrder})=>{
    
        
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
    