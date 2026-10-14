const { Given, When, Then } = require('@cucumber/cucumber');
const { timeout } = require("node:dns");


Given(': Ecommerce2 Application with {string} and {string}', async function (USERNAME, PASSWORD) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator("#username");
    const signInBtn = this.page.locator("#signInBtn");
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());

    await userName.fill(USERNAME);
    await this.page.locator("input[type='password']").fill(PASSWORD);
    await signInBtn.click();
});



Then(': Error Message is Displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toHaveText('Incorrect username/password.');
});




