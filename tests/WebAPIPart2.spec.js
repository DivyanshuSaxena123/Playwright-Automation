//---------------------------------------Section 12 - Lecture 65,66,67---------------------------------------------------


/*
In this section we will learn about the alternate way of doing API testing
So, as we know in WebAPIPart1 we have by bypass login step by direclty inject token.

So, 70% of website will be such that in which we require only token . But let say there is 
one banking website in which login is tedious task bcz it store different parameters like
token in storage, cookies, session etc. doing this by WebAPIPart1 approch will be very difficult

So, here what we will do we will login once and  gather all the storage, cookies, session etc. data of browser and store in .json. 
And whatever test case we need to run we will directly inject that .json file in the browser and then we can run our test cases.
*/


const {test, expect} = require('@playwright/test');
const { waitForDebugger } = require('node:inspector');

let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext(); // here we are creating a new browser context because we want to login to the application in a fresh browser context and then we will gather all the storage, cookies, session etc. data of that browser context and store in .json file. and if we do not create a new browser context then it will use the default browser context which is already logged in and it will not give us the correct data of storage, cookies, session etc. and also it will not give us the correct data of token which is required for our test cases.
    const page =  await context.newPage();

    //First we will login to the application
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('divyanshu@yopmail.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();

    //wait for the page to load after login
    await page.waitForLoadState('networkidle');

    // Now we have to store all the data at context level we cannot store at page level because page level data will be lost when we close the page and we have to use that data in other test cases also. so, we will store at context level and then we can use that data in other test cases also. and we can also use that data to login to the application without entering the credentials.
    await context.storageState({path:"state.json"}); // here we are storing all the data of the browser context in a file named "state.json" and then we can use that file to login to the application without entering the credentials. and this file will contain all the data of the browser context like cookies, local storage, session storage etc. and we can use that data to login to the application without entering the credentials.
    
    webContext = await browser.newContext({storageState:"state.json"}); // here we are creating a new browser context and we are passing the storage state file which we have created in the previous step and then we can use that browser context to login to the application without entering the credentials. and this browser context will contain all the data of the previous browser context like cookies, local storage, session storage etc. and we can use that data to login to the application without entering the credentials.



});

test('WebAPIPart2', async({})=>{

    //proudctName
    const productName = "ZARA COAT 3";
    const emailID = "divyanshu@yopmail.com";
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator('.card-body').first().waitFor(); // we are just making sure all item loaded successfully
    
    
    //Now we will fetch all titles
    const allTitles = await page.locator('.card-body b').allTextContents();

    const products = page.locator('.card-body');
    const count = await products.count();

    for(let i=0; i<count; i++){
        // Isse apan title box ke andar hain let text lene ke liye andar jana pdega
        if (await products.nth(i).locator('b').textContent() == productName) {
            // add to card
            //await products.nth(i).locator("button").last().click();
            // or
            await products.nth(i).locator("text=Add To Cart").last().click()

        }
        //await page.pause();

    }

    //Now we will click on the cart button
    await page.locator("[routerlink*='cart']").click(); // now as we know when we click on cart it maght take some time to load
    await page.locator("div li div").first().waitFor(); // so we will wait for the cart items to load. here "div li" is the locator for the cart items like container but if there are multiple items then we will use first().waitFor()



    //now we will verify that the product which we added in the cart is present in the cart or not. there are many ways to do that but let say here we will find by "text" having "h3" tag
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // vvv Important
    expect(bool).toBeTruthy(); // vvv Important


    //Now we will click on the checkout button
    await page.locator(".totalRow button").click();
    
    //Fill the credit card details
    const fieldsLabel = page.locator(".payment__cc form div div div[class='title']");
    const count2 = await fieldsLabel.count();
    for(let k=0; k<count2; k++){
    const label = (await fieldsLabel.nth(k).textContent()).trim(); // ✅ trim whitespace
    const parentLocator = fieldsLabel.nth(k).locator('..'); // ✅ go up to parent

    if (label === "CVV Code ?") {
        await parentLocator.locator('.input.txt').fill("123");
    } else if (label === "Name on Card") {
        await parentLocator.locator('.input.txt').fill("Divyanshu Saxena");
    } else if (label === "Apply Coupon") {
        await parentLocator.locator('.input.txt').fill("rahulshettyacademy");
    }

    }
  


    //Dynamic Dropdow Handling
    await page.locator("[placeholder*='Country']").pressSequentially("ind"); // "PrssSequentially" method is used to type the text in the input field one by one like "i" then "n" then "d" and so on. it will work like human typing. and it will also trigger the events like "onchange" or "oninput" which are triggered when we type in the input field. and it will also work with the auto-suggest dropdowns.
    
    /* Very Important Note - 
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    Here, a delay of 150 milliseconds is introduced between each key press.
    That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d
    */


    //now we will wait for the dropdown to load
    await page.locator(".ta-results").waitFor(); // here ".ta-results" is the locator for the dropdown container and we are using first() because there are multiple dropdowns on the page but we want to wait for the first dropdown to load. and then we will click on the desired option from the dropdown
    for(let j=0; j<await page.locator(".ta-results button").count(); j++){
        if(await page.locator(".ta-results button").nth(j).textContent() == " India"){
            await page.locator(".ta-results button").nth(j).click();
            break;
        }
    }
    

    //Now we will put some assertion like we have logged in with valid emailID
    expect(page.locator(".user__name [type='text']").first()).toHaveText(emailID); // this will check whether the emailID which we have logged in is present in the user name or not. and if it is present then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.

    //click on place order button
    await page.locator(".action__submit").click();

    //verify the order is placed or not 
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //now we grab orderid
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //click on my orders button
    await page.locator("button[routerlink*='myorders']").click();// it might take some time to load 
    await page.locator("tbody").waitFor(); 

    //assertion that we have landed on order page
    await expect(page.locator('div h1')).toHaveText("Your Orders");

    //Now we fetch all order 
    const allOrders = page.locator('tbody tr');
    const count3 = await allOrders.count();
    for(let m=0; m<count3; m++){
        if (orderId.includes(await allOrders.nth(m).locator('th').textContent())) { // here we are checking whether the orderId which we have grabbed is present in the order page or not. and if it is present then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.
            //clcik on view button
            await allOrders.nth(m).locator("button").first().click(); // here we are using ".." to go up to the parent element and then we are locating the button inside that parent element and then we are clicking on that button. and this button is the view button for that order.
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent(); // here we are grabbing the orderId details from the order details page and then we will compare it with the orderId which we have grabbed from the order confirmation page. and if it is same then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.    
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});