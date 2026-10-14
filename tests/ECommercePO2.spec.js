/*
We are simulating the same "ECommernce.spec.js"
*/

//---------------------------------------------------------

//Now in this way optimized our code using page object pattern but this can be further optimized as you can see in the above code we are creating object of each page and then we are calling the method of that page and passing the data as an argument. Now we will make another folder call "pageboject manager"

const {test, expect} = require('@playwright/test');
const {PageObjectManager} = require('./pageobjects/PageObjectManager');

//This can be further optimized like as we can see we passing data within test case or say hardcoded like email, etc.

test.only('ECommercePO2', async({page})=>{

    const productName = "ZARA COAT 3";
    const cardCvv = "123";
    const cardName = "Divyanshu Saxena";
    const couponCode = "rahulshettyacademy";
    const country = "ind";
    const Email = 'divyanshu@yopmail.com';
    const Password = 'Test@123';
    const orderSummaryText = " Thankyou for the order. ";
    

    const poManager = new PageObjectManager(page, expect);
    const loginPage = poManager.getLoginPage();
    await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.validLogin(Email,Password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartItem();
    await cartPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillCardDetails(cardCvv, cardName, couponCode, country, Email);
    await checkoutPage.navigateToOrderSummary();

    const orderSummaryPage = poManager.getOrderSummaryPage();
    const reponse = await orderSummaryPage.verifyOrderSummary(orderSummaryText);
    await orderSummaryPage.navigateToOrderListPage();

    const orderListPage = poManager.getOrderListPage();
    await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(reponse.orderId);


});


