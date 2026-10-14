/*
In this we will learn about "Abort"
Previosuly we were hitting API and sending response to browser. But here we will not send any response. By using "abort"
When we stop sending the response to browser this type of scenario occur when server is down. so, we will test how
our browser respond when we stop sending response to browser

Note - Playweright make trace of every request made through network tab. we can print all log in terminal let say api
is faling at somepoint instead of debugging we can check logs

*/



const { test, expect } = require('@playwright/test');
const { request } = require('node:http');

test.only('Browser Context Test', async ({browser})=> {
    //As we know any browser let say chrome -> plugin/cookies if we want to open  fresh browser without any plugin or cookies then we can use browser.context() method to create a new browser context.
    //Step 1 - Opning a new browser context
    const context = await browser.newContext();
    //Step 2 - Creating a new page in the browser context
    const page = await context.newPage();


    //If we want abort any url there is specific syntax for that
    //Ex - Let say we login into application and we dont images to load. if you see network logger there will be jpg, png or jpeg file .
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());
              //or if there is any specific url
    //page.route('**/*.css', route=> route.abort());          

    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");

    //printing all api logs in terminal
    page.on('request', request => console.log(request.url())); // ON method is a listener which will invoke when an event is occured.
    page.on('response', response => console.log(response.url() + " " + response.status())); // here we are printing the url and status code of the response in the terminal. this will help us to debug the api calls and also it will help us to identify which api is failing and which api is passing. and this will save our time in debugging the api calls.



    
    //Step 3 - Navigating to the URL
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

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
