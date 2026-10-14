/*
What you are testing: User A (Yahoo) creates a booking via a direct API call — no browser UI involved. User B (Gmail) 
logs in through the browser and tries to open that booking's URL directly. User B must see an "Access Denied" error.
*/

const{test, request, expect} = require('@playwright/test');
const loginGmailPayload = {email:"divyanshusaxena41@gmail.com", password:"Test@123"};
const loginYahooPayload = {email:"divyanshu.saxena@yahoo.com", password:"Test@123"};
let yahooToken;
let context;
let yahooBookingID;
test.beforeAll(async()=>{

    //Step 1 : Yahoo Login
    context = await request.newContext();
    const yahooLoginResponse = await context.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: loginYahooPayload
        })
        const yahooLoginRespJson = await yahooLoginResponse.json();
        yahooToken = yahooLoginRespJson.token;
        console.log(yahooToken);
        //putting assertion
        expect(yahooLoginResponse.ok()).toBeTruthy();   
        
     //Getting EventID 
     
     const yahooEventsResp = await context.get("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
        {
           headers: {
            Authorization: `Bearer ${yahooToken}`
           } 
        }
    )
    expect(yahooEventsResp.ok()).toBeTruthy();
    const yahooEventRespJson = await yahooEventsResp.json();
    const yahooID = yahooEventRespJson.data[0].id;
    console.log(yahooID);

    //creating booking and getting booking id

    const yahooBookingResp = await context.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
        {
            headers:{
                Authorization: `Bearer ${yahooToken}`
            },
            data: {
                customerEmail: "divyanshu.saxena@yahoo.com",
                customerName: "A D",
                customerPhone: "8824171334",
                eventId: yahooID,
                quantity: 1

            }
        }
    )
    expect(yahooBookingResp.ok()).toBeTruthy();
    const yahooBookingRespJson = await yahooBookingResp.json();
    yahooBookingID = yahooBookingRespJson.data.id;
    console.log(yahooBookingID);

});

test('@CI Assignment 4', async({page})=>{
    
    //gmail user
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.locator("#email").fill("divyanshusaxena41@gmail.com");
    await page.locator("#password").fill("Test@123");
    await page.locator("#login-btn").click();
    await expect(page.locator("#event-card").first()).toBeVisible();

    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingID}`,
        {
            waitUntil: 'networkidle'
        }
    );
    //await page.waitForLoadState('networkidle');// we can't use networkidle in this way bcz we are htting api not UI
    await expect(page.locator("text=Access Denied")).toBeVisible();
    await expect(page.locator("text=You are not authorized to view this booking")).toBeVisible();

});