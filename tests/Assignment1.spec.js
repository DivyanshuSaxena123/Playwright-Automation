/*
What you are testing: Create a brand new event from the admin panel, then complete a booking for that event, and finally verify the seat count drops by exactly 1.

Setup

- BASE_URL = https://eventhub.rahulshettyacademy.com

- Credentials: < Create your own credentials>

- Write a reusable login(page) helper function — you will call it at the start of the test





Steps

Step 1 — Login

- Navigate to /login

- Fill email field (locate by placeholder you@email.com)

- Fill password field (locate by label Password)

- Click the login button (locate by id #login-btn)

- Assert: link with text Browse Events → is visible (confirms login success)



Step 2 — Create a new event

- Navigate to /admin/events

- Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test

- Fill Title field (locate by id #event-title-input)

- Fill Description textarea (locate using #admin-event-form textarea)

- Fill City field (locate by label City)

- Fill Venue field (locate by label Venue)

- Fill Event Date & Time field (locate by label Event Date & Time) — use your futureDateValue() helper

- Fill Price ($) field (locate by label Price ($)) — use any number e.g. 100

- Fill Total Seats field (locate by label Total Seats) — use 50

- Click the submit button (locate by id #add-event-btn)

- Assert: toast message Event created! is visible



Step 3 — Find the event card and capture seats

- Navigate to /events

- Get all event cards (locate by data-testid="event-card")

- Assert the first card is visible (confirms page loaded)

- From all cards, filter for the one that contains your event title text

- Assert the matched card is visible (timeout 5 seconds)

- Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking



Step 4 — Start booking

- On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)



Step 5 — Fill booking form

- Assert: element with id #ticket-count has text 1 (default quantity)

- Fill Full Name (locate by label Full Name)

- Fill Email (locate by id #customer-email)

- Fill Phone (locate by placeholder +91 98765 43210)

- Click the confirm button (locate by CSS class .confirm-booking-btn)



Step 6 — Verify booking confirmation

- Locate the booking reference element (locate by CSS class .booking-ref, take .first())

- Assert it is visible

- Read its inner text, trim it — store as bookingRef



Step 7 — Verify in My Bookings

- Click the link View My Bookings

- Assert: URL is BASE_URL/bookings

- Get all booking cards (locate by id #booking-card)

- Assert the first booking card is visible

- Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text

- Assert that matched card is visible

- Assert that matched card contains your eventTitle text



Step 8 — Verify seat reduction

- Navigate back to /events

- Assert the first event card is visible

- Filter cards again using hasText: eventTitle

- Assert the card is visible

- Read the seat count text again (same as Step 3) — store as seatsAfterBooking

- Assert: seatsAfterBooking === seatsBeforeBooking - 1



Questions for this assignment
Complete the Playwright code for given manual Instructions.
*/

const {test, expect} = require('@playwright/test');


 // FutureDatehelper
    // Returns a future date in format required by datetime-local input
    function futureDateValue() {
        const future = new Date();
        future.setDate(future.getDate() + 7); // 7 days from today
    
        // Format → "YYYY-MM-DDTHH:MM" required by datetime-local input
        const yyyy = future.getFullYear();
        const mm   = String(future.getMonth() + 1).padStart(2, '0');
        const dd   = String(future.getDate()).padStart(2, '0');
        const hh   = String(future.getHours()).padStart(2, '0');
        const min  = String(future.getMinutes()).padStart(2, '0');
    
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        // Output → "2026-05-08T10:30"
    }

test.only('Assignment 1', async({page})=>{
    
    
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    /*

    await page.locator("a[href='/register']").click();
    await page.locator('#register-email').fill("divyanshusaxena41@gmail.com");
    await page.locator('#register-password').fill("Test@123");
    await page.getByPlaceholder('Repeat your password').fill("Test@123");
    await page.locator('#register-btn').click();
    */

    await page.getByPlaceholder('you@email.com').fill("divyanshusaxena41@gmail.com");
    await page.getByLabel('Password').fill("Test@123");
    await page.locator('#login-btn').click();
    await expect(page.locator("a span[class*='inline-flex']")).toBeVisible();

    await page.locator("//button[text()='Admin']").click();
    await page.locator("a[href='/admin/events'] svg").click();

    const eventTitle = `Test Event ${Date.now()}`; // this will create title like - Test Event 2342323
    await page.locator('#event-title-input').fill(eventTitle);
    await page.locator('div textarea').fill("Test");
    await page.locator('#city').fill("Jaipur");
    await page.locator('#venue').fill("SMS Jaipur");

    await page.locator("//input[@id='event-date-&-time']").fill(futureDateValue());
    await page.getByLabel('price ($)').fill("200"); //here in locator price-($) but we need to remove "-"
    await page.getByLabel('total seats').fill("500");
    await page.locator("button[type='submit']").click();
    await expect(page.locator("p[class*='leading-snug']")).toHaveText('Event created!');

    await page.locator('#nav-events').click();
    //const eventTitles = page.locator("article h3[class*='leading-snug']").allTextContents();
    const allEvents = page.locator('#event-card');
    await page.locator('#event-card').first().waitFor();
    let seatsBeforeBooking
    //let t;
    for(let i=0; i<await allEvents.count(); i++){
        //await page.pause();
        //t = await allEvents.nth(i).locator("article h3[class*='leading-snug']").textContent();
        //console.log(t);
        if(await allEvents.nth(i).locator("h3[class*='leading-snug']").textContent() == eventTitle){
            await expect(allEvents.nth(i)).toBeVisible({timeout: 5000})

            //seatsBeforeBooking = parseInt((await allEvents.nth(i).locator('article div div:last-child :first-child span').textContent()).split("seats")[0].trim());
            seatsBeforeBooking = parseInt((await allEvents.nth(i).locator('span.text-emerald-600').textContent()).split("seats")[0].trim());
            //const s = seat.split("seats");
            //const f = s[0].trim();
            await allEvents.nth(i).locator('#book-now-btn').click();
            break;

        }

    }
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.locator('#customerName').fill("Avinash Joshi");
    await page.locator('#customer-email').fill("brysonreed@yopmail.com");
    await page.locator('#phone').fill("+918824171320");
    await page.locator("button[type='submit']").click();

    await page.waitForLoadState('networkidle');

    await expect(page.locator("//span[text()='Booking Ref']")).toHaveText("Booking Ref");
    const bookinRef = await page.locator("//span[contains(@class,'booking-ref')]").textContent();

    await page.locator("//button[contains(text(),'View My Bookings')]").click();

    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    await page.locator('#booking-card').first().waitFor();

    await expect(page.locator('#booking-card').first()).toBeVisible();

    const allBookingCards =  page.locator('#booking-card');

    for(let j=0; j<allBookingCards.count(); j++){
        if(allBookingCards.nth(j).locator("//span[contains(@class,'booking-ref')]").textContent()== bookinRef){
            await expect(page.locator('#booking-card')).toBeVisible();
            await expect(page.locator("//h3[contains(@class,'text-gray-900')]").textContent()).toHaveText(eventTitle)

            break;

        }
    }

    await page.locator('#nav-events').click();
    await page.locator('#event-card').first().waitFor();
    for(let i=0; i<allEvents.count(); i++){
        if(allEvents.nth(i).locator("article h3[class*='leading-snug']").textContent() == eventTitle){
            await expect(page.locator("article h3[class*='leading-snug']")).toBeVisible({timeout: 5000})

            const seatsAfterBooking = parseInt((await page.locator('article div div:last-child :first-child span').textContent()).split("seats")[0].trim());
            //const s = seat.split("seats");
            //const f = s[0].trim();
            expect(seatsAfterBooking).toEqual(seatsBeforeBooking-1);
            break;

        }

    }











});