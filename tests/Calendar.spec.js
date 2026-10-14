const {test, expect} = require('@playwright/test');


test('Calendar Handling', async({page})=>{
    //First we will give the parameters which year, date and month need to select in calendar

    const month = "5";
    const date = "15";
    const year = "2027";

    //
    const expectedList = [month,date,year];

    //first we open the page direct where the calendar is present
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();//one click
    await page.locator('.react-calendar__navigation__label').click();//2nd click on same button
    await page.getByText(year).click();

    await page.locator('.react-calendar__year-view__months__month').nth(Number(month) - 1).click();
    
    //now we will select date
    await page.locator("//abbr[text()='"+date+"']").click();


    //Note = This code will fail for date like 28, 29 etc specially in future year

    //now we will put assertion on calendar to check filled values are correct or not. There are 2 ways
    // 1 - we fetch complete calendar value and then split and then compare it with give data
    // 2 - we will try fetch date, month and year with same locator
    const inputs = page.locator('.react-date-picker__inputGroup__input')// now this will return multiple tag now we will hove for loop over it & extract date, month and year. here css selector is very important

    for(let i=0; i<expectedList.length; i++) {
        //or we can inputValue() also instead of getAttribute()
        const  value =  await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);


    }









});