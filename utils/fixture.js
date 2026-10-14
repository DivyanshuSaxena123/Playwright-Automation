const base = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = {userEmail:"divyanshusaxena41@gmail.com", userPassword:"Test@123"};
const orderPayload = {orders:[{country:"India", productOrderedId:"6960eac0c941646b7a8b3e68"}]};


exports.customtest = base.test.extend({
    // Add fixtures here
    
    authenticatedPage: async({page}, use) => 
    {
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('rahulshettyw@gmail.com');
        await page.locator('#userPassword').fill('Learning@830$3mK3');
        await page.locator('#login').click();
        await page.waitForLoadState('networkidle');
        await use(page);
        // tearDown
        await context.close();

    },
    createOrder: async({}, use) =>
    {
        const apiContext = await request.newContext();
        const apiutils = new APIUtils(apiContext, loginPayload);
        const response = await apiutils.createOrder(orderPayload);
        await use(response);
        // tearDown
        await apiContext.dispose();

    },
    testDataForOrder   :  {
        productName : "ZARA COAT 3"
    }          
    
});
