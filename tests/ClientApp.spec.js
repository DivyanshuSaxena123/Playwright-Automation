//-------------------------------SECTION 4 & Section 5----------------------------------------------
const {test, expect} = require('@playwright/test');


//test.describe.configure({mode:'parallel'}); // this will help in running test case paralley idelly it will sequentially
test.describe.configure({mode:'serial'}); //Now, we must be wondering what is the purpose of serial here when we know that ideally test case will run sequentially but serial means it is helpful when test cases are interdependent on each other let say testcase1 must be passed in order to get to testcase2 . what serial will do is if testcase1 is passed then only it will execute testcae2 otherwise not

test('@CI Client App', async({page})=>{
    // First we register the user
    /*
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    await page.locator('#firstName').fill('Divyanshu');
    await page.locator('#lastName').fill('Saxena');
    await page.locator('#userEmail').fill('divyanshu@yopmail.com');
    await page.locator('#userMobile').fill('9876543210');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#confirmPassword').fill('Test@123');
    await page.locator("[type='checkbox']").click();
    await page.locator('#login').click();
    */

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('divyanshu@yopmail.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();

    /*
    Now as we know that in today world most of application are based on API
    therefore  after click on login we will put wait :
    
    Option 1 - await page.waitforloadstate('networkidle');

    //or 

    Option 2 - user waitFor() but it will work only if return type is single element not the list or array

    */

   await page.waitForLoadState('networkidle');

   //await page.locator('.card-body b').first().waitFor();
   
   //Now we will fetch the all products and then we will click on the product which we want to add in the cart
   const allProducts = await page.locator('.card-body b').allTextContents();
   console.log(allProducts);



});


//----------------------------------------------------------------------------------------


test('UI Controls', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");
    const documentsLink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacadem");
    await page.locator("input[type='password']").fill("Learning@830$3mK2");

    //How to handle dropdown in playwright
    //Static dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");

    //Radio button
    await page.locator(".radiotextsty").nth(1).click(); // This will click on the second radio button which is "User"
    await page.locator("#okayBtn").click();

    // Assertions on radio button
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked(); // This will check whether the second radio button is selected or not
    console.log(await page.locator(".radiotextsty").nth(1).isChecked()); // This will return true if the second radio button is selected otherwise it will return false. This is not an assertion this just print the value in the console whether it is true or false
    
    
    //Checkbox
    await page.locator("#terms").click(); // This will check the checkboox
    
    //Assertions on checkbox
    await expect(page.locator("#terms")).toBeChecked(); // This will check whether the checkbox is selected or not
    console.log(await page.locator("#terms").isChecked()); // This will return true if the checkbox is selected otherwise it will return false



    //Uncheck the checkbox
    await page.locator("#terms").uncheck(); // This will uncheck the checkbox
    //Assertions on uncheck checkbox
    expect(await page.locator("#terms").isChecked()).toBeFalsy() // This will check whether the checkbox is not selected or not


    //Now let's say we want to check whether the link is blinking or not on that page for that we need to verify that "attribute is having that value or not"
    await expect(documentsLink).toHaveAttribute("class", "blinkingText"); // This will check whether the class attribute is having the value "blinkingText" or not
    
    



    //Playwright is very quick so, in order to check whether it has selected "consult"
    //await page.pause(); // This will pause the execution of the test and open the Playwright Inspector where we can check the state of the dropdown and other elements on the page.
    await signInBtn.click();
});



//----------------------------------------------------------------------------------------




//Child Window Handling - It means that when we click on any link and it opens in new tab or new window then how we can handle that new tab or new window in Playwright
// Since it will open a new window in the same browser therefore we need to pass "browser"
test('Child Window Handling', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentsLink = page.locator("[href*='documents-request']");
   
   
   // ! If we declare after click then it will not work and if we declare before click then also it will not work. So, these have to work together
   //const newPage = await context.waitForEvent('page'); 
   
   
    /*
    This will not work here also so, we have to remove "await". 
    The purpose of await is to wait until the action is performed but here we are 
    waiting for the new page to open therefore we cannot use await here because 
    it will wait for the new page to open and then it will perform the 
    action but we want to perform the action on the new page after it is opened 
    therefore we cannot use await here. So, these type of operation are categoried 
    in playwright as 
    
    "Promise" - It is divided into 3 parts - Pending, Rejected and Fulfilled. So, 
    
    when we click on the documents link then it will be in pending state because it is 
    waiting for the new page to open and once the new page is opened then it will be 
    in fulfilled state and if there is any error while opening the new page then it will 
    be in rejected state. So, we cannot use await here because it will wait for the 
    new page to open and then it will perform the action but we want to perform the 
    action on the new page after it is opened therefore we cannot use await here. So, 
    we have to remove await here.
    */
    
    const [newPage] = await Promise.all(
    [ 
    context.waitForEvent('page'),
    documentsLink.click(),
    ]); //This will comeout only when all actions are performed

    const text = await newPage.locator(".red").textContent();
    console.log(text);

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    await page.pause();
    //console.log(await page.locator("#username").textContent());
    console.log(await page.locator("#username").inputValue());

    /*^^ Difference between "textContent()" and "inputValue()" 
    is that "textContent()" will return the text content of the element present in DOM but 
    "inputValue()" will return the value of the input field. 
    So, in this case we are trying to fetch the value of the input field therefore we should use "inputValue()" instead of "textContent()". 
    But in this case it will return empty because we are trying to fetch the value of the input field before filling it therefore it will return empty because there is no value in the input field at that time. 
    So, we should use "inputValue()" after filling the input field.
    */  
    

    /* 
    Very Important - So we will declare the  before click

    //Now as per actions we need to tell playwright that we are expecting a new page to open therefore we need to use "waitForEvent" method to wait for the new page to open and then we can perform the actions on that new page.
    const newPage = await context.waitForEvent('page'); //Now this variable has the knowledge of the new page that is opened after clicking on the documents link and now we can perform the actions on that new page.
    //But there is problem with the above statement that it will wait for the new page to open but it will not wait for the new page to load therefore we need to use "waitForLoadState" method to wait for the new page to load before performing any actions on that new page.
    */

});
