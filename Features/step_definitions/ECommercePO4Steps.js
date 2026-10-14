const {Given, When, Then} = require('@cucumber/cucumber');
const {PageObjectManager} = require('../../tests/pageobjects/PageObjectManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');

//Now, as you can see we are passing page and expect in PageObjectManager since we are using cuccumber we cannot do this "const{page, epxect}=require('@playwright/test')" there for in order to pass page 

//Note: Cucumber by default run step for 5sec if it is not executed in 5sec it will mark as Failed. So, if we know that some steps might take more than sec to execute therefore increase the timeout like i have done in First Step . We can also run this command -  "npx cucumber-js --exit" so, this command will run all your test and come out of the loop

Given(': a login Ecommerce Application with {string} and {string}', {timeout: 100*1000} ,async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    // since we are using await then we need to make func async

    //Now as we can see here in code that like, page, expect, PageObjectManager and other is common to all given, when and then but since it is define only on give() so, it can be used by other so, either we make it global or use world constructor
    const browser = await playwright.chromium.launch({headless: false}) //we can also give property like headless in lauch
    const context = await browser.newContext();
    const page =  await context.newPage();

    this.poManager = new PageObjectManager(page, expect); // as you can see in this code we have put "this". before poManager bcz we are usiing "World" constructor so, this can be accessible across the steps
    const loginPage = this.poManager.getLoginPage();
    await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.validLogin(username,password);
});


When(': Adding the item to the cart {string}', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
});      

Then(': Navigating to cart and verifying the {string} is added or not', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToCart();
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.verifyCartItem();
});


When(': Enter valid details at checkout screen like {string} and {string} and {string} and {string} and {string} and place the order', async function (cardCvv, cardName, couponCode, country, Email) {
           // Write code here that turns the phrase above into concrete actions
    await this.cartPage.navigateToCheckout();
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.fillCardDetails(cardCvv, cardName, couponCode, country, Email);
    await checkoutPage.navigateToOrderSummary();
});



Then(': Verify order summary text like {string} on Order Summary Screen', async function (orderSummaryText) {
           // Write code here that turns the phrase above into concrete actions
    const orderSummaryPage = this.poManager.getOrderSummaryPage();
    this.reponse = await orderSummaryPage.verifyOrderSummary(orderSummaryText);
    await orderSummaryPage.navigateToOrderListPage();
});



Then(': Verify the order is present in Order History', async function () {
           // Write code here that turns the phrase above into concrete actions
    const orderListPage = this.poManager.getOrderListPage();
    await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(this.reponse.orderId);
});