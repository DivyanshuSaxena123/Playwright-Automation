//--------------------------------------Section 17 -------------------------------------------------------------



/*
We are simulating the same "ECommernce.spec.js"
*/

//---------------------------------------------------------

//Now in this way optimized our code using page object pattern but this can be further optimized as you can see in the above code we are creating object of each page and then we are calling the method of that page and passing the data as an argument. Now we will make another folder call "pageboject manager"

const {test, expect} = require('@playwright/test');
const {LoginPage} = require('./pageobjects/Login');
const {DashboardPage} = require('./pageobjects/DashboardPage');
const {CartPage} = require('./pageobjects/CartPage');
const {CheckoutPage} = require('./pageobjects/CheckoutPage');
const {OrderSummaryPage} = require('./pageobjects/OrderSummaryPage');
const {OrderListPage} = require('./pageobjects/OrderListPage');



test.only('ECommercePO', async({page})=>{

    const productName = "ZARA COAT 3";
    const cardCvv = "123";
    const cardName = "Divyanshu Saxena";
    const couponCode = "rahulshettyacademy";
    const country = "ind";
    const Email = 'divyanshu@yopmail.com';
    const Password = 'Test@123';
    const orderSummaryText = " Thankyou for the order. ";
    
    const loginPage = new LoginPage(page);
    await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.validLogin(Email,Password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    const cartPage = new CartPage(page, expect);
    await cartPage.verifyCartItem();
    await cartPage.navigateToCheckout();

    const checkoutPage = new CheckoutPage(page, expect);
    await checkoutPage.fillCardDetails(cardCvv, cardName, couponCode, country, Email);
    await checkoutPage.navigateToOrderSummary();

    const orderSummaryPage = new OrderSummaryPage(page, expect);
    const reponse = await orderSummaryPage.verifyOrderSummary(orderSummaryText);
    await orderSummaryPage.navigateToOrderListPage();

    const orderListPage = new OrderListPage(page, expect);
    await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(reponse.orderId);


});


