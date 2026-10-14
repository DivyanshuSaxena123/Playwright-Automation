//------------------------------------------Section 7 -----------------------------------

const {test, expect} = require('@playwright/test');


/*
In this test we will learn about the special locators in playwright like 
1) getByRole
2) getByLabel
3) getByPlaceholder
4) getByText
5) getByAltText
6) getByTitle

Note - npx playwright test --ui - This command will open "Test Rnnner" where u can run test cases and also the action visually
*/
test('Playwright Special Locators', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel - if we want to perform any action like click on a) checbox or b) radio button or c) dropdown except "entering text into input field" and this locator will work only when there is a label associated with the element. and this locator will work based on the text of the label.

    //checkbox
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // here we are checking the checkbox which is associated with the label "Check me out".
    //radio button
    await page.getByLabel("Employed").check(); // we can also use "click()" method but "check()" method is more appropriate for radio button . Both are same 
    
    //dropdown
    await page.getByLabel("Gender").selectOption("Female"); // if dropdown options are in "select" tag then only it will work

    //placeHolder
    await page.getByPlaceholder("Password").fill("abc123"); // Note this only work if in html we have give "placeholder" tag for the edit box

    //getByRole
    await page.getByRole("button", {name: 'Submit'}).click(); //getByRole works for button , links and many more options it gives you. but we should know some knowledge about html also for ex-
    // here in getByRole "button" - now this work either "button" tag or "input" tag along with "class - btn" is present

    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    
    await page.getByRole("link", {name: "Shop"}).click();
    // here in getByRole "link" :- <a> anchor tag should be present in html



    //very important - chaning methods - performing multiple in  same command 
    // after click of "Shop" user will land on next page where list of item is present , now as we know previously we have used xpath or css and fetch all element and then via for loop we filter out that element
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click(); // now you must be thinking why i have not passed button bcz since there is only card button in that card
    /* "app-card" tag name se sare item fetch krega . since we are using tagName so, 
    ek tarah se "CSS" selector hai yeh. so it will all card 4 cards. Now, since we want to "click" on
    "Add" button Nokia Phone- So, first we need to filter out "Nokia" phone card
    */


    /*
    getByLabel - we will learn more about label why it does work sometimes and sometimes dont
    It has some rules like - 

    1) if our html is like this
    <label>Password  <input type='password' /></label> so, as you can see both label and text box are inside label, that's why "getByLabel" work 
    if they dont were on label then it will not work. so, there need to some relation then only it will work
    */








});
