//this is fixture file . We can send data as a fixture also but we can send only one data we cannot parameterize 

//What is fixture ?
// Fixture is a piece of code that can be reused across multiple test cases.

const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        //here we will define fixtures
        testDataForOrder : {
            productName : "ZARA COAT 3",
            cardCvv : "123",
            cardName : "Divyanshu Saxena",
            couponCode : "rahulshettyacademy",
            country : "ind",
            Email : "divyanshu@yopmail.com",
            Password : "Test@123",
            orderSummaryText : " Thankyou for the order. "
        }
    }
)

