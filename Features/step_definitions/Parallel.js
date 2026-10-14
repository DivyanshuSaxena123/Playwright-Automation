
const {Given, When, Then} = require('@cucumber/cucumber');
const { timeout } = require("node:dns");
const {expect} = require('@playwright/test');

Given(': Login in Ecommerce Application with {string} and {string}', {timeout: 100*1000}, async function (user, pass) {
    // Write code here that turns the phrase above into concrete actions
    
    const loginPage = this.poManager.getLoginPage();
    await loginPage.landingPage("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.validLogin(user,pass);
});



When(': Add the item to the cart {string}', async function (prod) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(prod);
});



Then(': Navigate to cart and verifying the {string} is added or not', async function (prod) {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToCart();
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.verifyCartItem();
});



When(': Ente right details at checkout screen like {string} and {string} and {string} and {string} and {string} and place the order', async function (cv, cn, cc, c, e) {
    // Write code here that turns the phrase above into concrete actions
    await this.cartPage.navigateToCheckout();
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.fillCardDetails(cv, cn, cc, c, e);
    await checkoutPage.navigateToOrderSummary();
});



Then(': Verify summary text like {string} on Order Summary Screen', async function (text) {
    // Write code here that turns the phrase above into concrete actions
    const orderSummaryPage = this.poManager.getOrderSummaryPage();
    this.reponse = await orderSummaryPage.verifyOrderSummary(text);
    await orderSummaryPage.navigateToOrderListPage();
});
       


Then(': Ver the order is present in Order History', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderListPage = this.poManager.getOrderListPage();
    await orderListPage.verifyOrderListPageandClickingOnOrderPlaced(this.reponse.orderId);
});


Given(': E-comm Application with {string} and {string}', async function (u, p) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator("#username");
    const signInBtn = this.page.locator("#signInBtn");
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());

    await userName.fill(u);
    await this.page.locator("input[type='password']").fill(p);
    await signInBtn.click();
});



Then(': Err Mes is Visible', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toHaveText('Incorrect username/password.');
});