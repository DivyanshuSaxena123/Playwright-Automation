//this is fixture file . We can send data as a fixture also but we can send only one data we cannot parameterize 

//What is fixture ?
// Fixture is a piece of code.

import{test as baseTest} from '@playwright/test'; //baseTest is a reference name

//we will make interface of testDataForOrdr
interface TestDataForOrder {
    productName:string;
    cardCvv:string;
    cardName:string;
    couponCode: string;
    country: string;
    Email: string;
    Password: string;
    orderSummaryText: string;
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
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

