//---------------------------------------Section 15 Lecture 77,78 -------------------------

/*
In this project we will learn how to take screenshot of "entire page" and of specific element.
And , will also learn about "Visual Testing"
*/


const{test, expect} = require('@playwright/test');

test('Screenshot', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'textfieldscreenshot.png'}) // it will take the screenshot of that particular element
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'}); // it will take the complete screen screenshot
    await expect(page.locator('#displayed-text')).toBeHidden();
})




/*
What is Visual Testing ?
The test will take the screenshot of web page and then compare with the original image 
and test UI like button is properly aligned or not etc ..
*/

test('Visual Testing 1', async({page})=>{
    await page.goto("https://www.flightaware.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png'); // at first it will fail but 2nd it will pass bcz in first run it will take screenshot of website and look for "landing.png" file in project to match UI. but in second run it will pass
   
})


test.only('Visual Testing 2', async({page})=>{
    await page.goto("https://www.google.com");
    expect(await page.screenshot()).toMatchSnapshot('google.png'); // at first it will fail but 2nd it will pass bcz in first run it will take screenshot of website and look for "landing.png" file in project to match UI. but in second run it will pass
   
})