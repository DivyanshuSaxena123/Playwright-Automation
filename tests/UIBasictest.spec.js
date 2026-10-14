
//-------------------------------SECTION 4----------------------------------------------



/*
Important Notes:

very very important - The framework we will learning and working of using Playwright with JavaScript or Typescript is Mocha Framework

1. Javascript is an Async language, so we need to use async/await to wait for the elements to be present before interacting with them.
Async mean that the code will not wait for the previous line to finish before moving on to the next line. This is why we need to use async/await to ensure that the elements are present before interacting with them.
we have to write "await" before the actions that we want to perform on the elements, such as clicking or filling in a form. This will ensure that the code waits for the element to be present before performing the action.

But we also have to make the function async by adding the "async" keyword before the function definition. This will allow us to use the "await" keyword inside the function.

Note:- if we don't give any name to function then it will be an anonymous function and we can write it like this:
test('UI Basic Test', async () => {
});

2. We will import (playwright/test) from the @playwright/test package to use the testing framework provided by Playwright.
3. By default, Playwright will run headless, which means that the browser will not be visible when the tests are running. If we want to see the browser while the tests are running, we can set the "headless" property to false in the configuration file (playwright.config.js) like this:
use: {
    headless: false,
    browserName: 'chromium'
  },

  or
we can also give in command line while running the tests like this:
npx playwright test --headed

4. Now, let say if we want to run a specific test from multiple tests then we can use the "test.only" method to run only that specific test. 
For example, if we have multiple tests in our test file and we want to run only one test, we can write like this:
test.only('Browser Context Test', async ({browser})=> {
    // test code here
});

5. Now, we will learn about locators in Playwright. There are 2 typrs of locators in Playwright:

a) CSS Selector: We can use CSS selectors to locate elements on the page. For example, if we want to locate an element with the id "username", we can write like this:
const username = page.locator('#username');

Now, we can write CSS selector based on the different attributes like:
1) If ID is present then we can use "#id" or "tagname#id".
2) If class is present then we can use ".class" or "tagname.class".
3) If attribute is present then we can use "[attribute=value]" or "tagname[attribute=value]".
4) Traversing from parent to child then we can use "parent > child" or "parent child".
5) If we need to write locator based on the text then we can use - text='your text'. 

b) XPath: We can also use XPath to locate elements on the page. For example, if we want to locate an element with the id "username", we can write like this:
const username = page.locator('//input[@id="username"]');

but most predominantly we use CSS selector in Playwright to locate elements on the page because it is faster than XPath and also more reliable.

6. If we need send any data to any input field then we can use the "fill" method to fill the input field with the desired data. For example, if we want to fill the username field with the value "rahulshettyacademy", we can write like this:
page.locator('#username').fill('rahulshettyacademy');

7. If we want to clear the input field then we can use - fill("")

--------------------------------------------------------------------------------------------------------------------------

Lecture 8 Notes :- 
1) How to debug code in playwirght and what other things we can do ?
Ans) Command to debug playwright code - npx playwright "foldername"  "testfilename like ClientApp.spec.js" --debug - also called as codegen tool there are multiple convention as well
There are some other features of playwright while in debug mode. Let say if your case failing at some line

By using debug we can inspect also and also generate the locator for that and also can validate our locator either we have use css, xpath or specialLocator - see video - lecture 8

2) What is codegen ?
Ans) By using codegen we can record our script and also codegen will wite test cases code on its own by action you performed on browser
Command - npx playwirght codegen "url" - voh url dena hai jisko apko test krna hai
As soon as you hit this command it will open inspector and chrome - see video

3) If we want screenshot, trace then in config file provide these things. 
if you to play your tracefile then go to "trace.playwright.dev" and upload your file

*/

const { test, expect } = require('@playwright/test');

test('Browser Context Test', async ({browser})=> {
    //As we know any browser let say chrome -> plugin/cookies if we want to open  fresh browser without any plugin or cookies then we can use browser.context() method to create a new browser context.
    //Step 1 - Opning a new browser context
    const context = await browser.newContext();
    //Step 2 - Creating a new page in the browser context
    const page = await context.newPage();


    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");



    
    //Step 3 - Navigating to the URL
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //await page.locator("#username").fill("rahulshettyacademy"); // we have store locator in a variable and then perform the actions on that variable
    await userName.fill("rahulshettyacadem");
    await page.locator("input[type='password']").fill("Learning@830$3mK2");
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.');


    // let store locator in a variable and then perform the actions on that variable

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();

    /*
    Now, here is trick part for the below statement if i comment out  line 
    
    //console.log(await page.locator(".card-body a").first().textContent());
    //console.log(await page.locator(".card-body a").nth(0).textContent());

    
    
    "alltextContents" method will return an empty array because the first two statements are fetching the 
    title of the first product and if we comment out those statements then it will not fetch the title 
    of the first product and when we will try to fetch all titles then it will return an empty 
    array because there is no title to fetch. bcz for text content there is by default wait system but 
    for "alltextContents" there is no wait system so it will return an empty array because there is 
    no title to fetch.
    */

    //Now our target is to sign in the website and grab the title of first product
    console.log(await page.locator(".card-body a").first().textContent());

    //or

    console.log(await page.locator(".card-body a").nth(0).textContent());

    //but what if we want to fetch all titles
    const allTitles = await page.locator(".card-body a").allTextContents();
    console.log(allTitles);

});


test('Page Context Playwright Test', async ({page})=> {
    //As we know any browser let say chrome -> plugin/cookies if we want to open  fresh browser without any plugin or cookies then we can use browser.context() method to create a new browser context.
    // But now let say we don't have anything or dont want anything to pass in the browser context then we can directly use the page object to perform the actions on the page.
    
    //Step 1 - Opning a new browser context. We can comment this step
    //const context = await browser.context();


    //Step 2 - Creating a new page in the browser context. We can comment this step as well
    //const page = await context.newPage();
   
   
   
    //Step 3 - Navigating to the URL
    await page.goto('https://www.google.com/');
    console.log(await page.title());




});


test('Facebook Test', async ({page})=> {
    
    //Step 3 - Navigating to the URL
    await page.goto('https://www.facebook.com/');
    // get title - assertion

    /*
    1) We can use the "console.log" method to print the title of the page in the console. This will help us to verify that we are on the correct page and the title is correct.

    2) We can also use the "expect" method to assert that the title of the page is correct. This will help us to ensure that the test will fail if the title is not correct.
    */
    console.log(await page.title());
    await expect(page).toHaveTitle("Facebook");

    

});