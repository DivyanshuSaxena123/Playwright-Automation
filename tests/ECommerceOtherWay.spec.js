//----------------------------------------------Section 7 - Lecture 46. ----------------------------------------------------

const {test, expect} = require('@playwright/test');
const { waitForDebugger } = require('node:inspector');

test('Econmerce App Flow Using Special Locators', async({page})=>{

    //proudctName
    const productName = "ZARA COAT 3";
    const emailID = "divyanshu@yopmail.com";

    //First we will login to the application
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder("email@example.com").fill('divyanshu@yopmail.com');
    await page.getByPlaceholder("enter your passsword").fill('Test@123');
    await page.getByRole('button', {name:'Login'}).click();

    //wait for the page to load after login
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body').first().waitFor(); // we are just making sure all item loaded successfully
    
    
    //Now we will fetch all titles and click on "Add to Cart" button which has "Zara Coat 3"
    await page.locator('.card-body').filter({hasText:productName}).getByRole('button',{name:'Add to Cart'}).click();


    //Now we will click on the cart button
    await page.getByRole("listitem").getByRole('button',{name:'Cart'}).click(); // now here we have first filter it by "tagNmae" and then we have used "getByRole" again and click on "button"
    
    
    await page.locator("div li div").first().waitFor(); // so we will wait for the cart items to load. here "div li" is the locator for the cart items like container but if there are multiple items then we will use first().waitFor()



    //now we will verify that the product which we added in the cart is present in the cart or not. there are many ways to do that but let say here we will find by "text" having "h3" tag
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();


    //Now we will click on the checkout button
    await page.getByRole('button', {name:'Checkout'}).click();
    
    //Fill the credit card details
    const fieldsLabel = page.locator(".payment__cc form div div div[class='title']");
    const count2 = await fieldsLabel.count();
    for(let k=0; k<count2; k++){
        const label = (await fieldsLabel.nth(k).textContent()).trim(); // ✅ trim whitespace
    const parentLocator = fieldsLabel.nth(k).locator('..'); // ✅ go up to parent

    if (label === "CVV Code ?") 
    {
        await parentLocator.locator('.input.txt').fill("123");
    } else if (label === "Name on Card") 
    {
        await parentLocator.locator('.input.txt').fill("Divyanshu Saxena");
    } else if (label === "Apply Coupon") 
    {
        await parentLocator.locator('.input.txt').fill("rahulshettyacademy");
    }
    
    }


    
  


    //Dynamic Dropdow Handling
    await page.getByPlaceholder("Select Country").pressSequentially("ind"); // "PrssSequentially" method is used to type the text in the input field one by one like "i" then "n" then "d" and so on. it will work like human typing. and it will also trigger the events like "onchange" or "oninput" which are triggered when we type in the input field. and it will also work with the auto-suggest dropdowns.

    await page.getByRole('button', {name: "India"}).nth(1).click();
    
    /* Very Important Note - 
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    Here, a delay of 150 milliseconds is introduced between each key press.
    That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d
    */


    

    //Now we will put some assertion like we have logged in with valid emailID
    expect(page.locator(".user__name [type='text']").first()).toHaveText(emailID); // this will check whether the emailID which we have logged in is present in the user name or not. and if it is present then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.

    //click on place order button
    await page.getByText("Place Order ").click(); // here we have used "getByText()" because here by mistage dev has used <a> andhor tag but class has "btn"

    //verify the order is placed or not 
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

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