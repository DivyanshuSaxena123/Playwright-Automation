const{test, expect} = require('@playwright/test');

test('More Validation', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto('https://www.google.com/');

    // Now since we are hitting 2 url firt it will open "Automation Practice" and then it will open "Google"
    //await page.goBack(); // it will take us to "Automation Practice" page
    //await page.goForward(); // it will take us to "Google" page
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();


    //How to handle Java/JavaScript alert popup in Playwright
    page.on('dialog', dialog=>dialog.accept()); // This will accept the alert popup)
    await page.locator('#confirmbtn').click(); 

    //How to hover and select from auto suggestive dropdown in Playwright
    await page.locator('#mousehover').hover(); // This will hover on the mouse hover button

    //Now we will learn about frames and how to handle frames in Playwright. 
    //Frames are nothing but they are like a webpage inside a webpage. They are used to embed another webpage inside a webpage. For example, if we have a webpage and we want to embed another webpage inside that webpage then we can use frames. Now the question is how to handle frames in Playwright.
    // First look for iframe is present in webpage or not. then we can handle it via "iframename" or "iframeid"
    
    const framesPage = page.frameLocator("#courses-iframe"); // here we are locating the frame using its id "courses-iframe"
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // here we are clicking on the "Learning Path" link which is present inside the frame. here we are using "visible" because there are multiple links with same href but we want to click on the visible one
    const textMsg = await framesPage.locator('.text h2').textContent();
    console.log(textMsg.split(" ")[1].trim());


});