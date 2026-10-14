/*
What you are testing: Two separate tests — one booking with 1 ticket should show "Eligible for refund", 
a booking with 3 tickets should show "Not eligible for refund". Both tests verify the spinner appears and disappears before showing the result.

Both tests verify the spinner appears and disappears before showing the result.

---

Setup

- BASE_URL = https://eventhub.rahulshettyacademy.com

- Credentials: Use your own credentials

- Write a reusable loginAndGoToBooking(page) helper that logs in and confirms the Browse Events → link is visible

Test 1 — Single ticket booking is eligible for refund

Step 1 — Login

- Call your login helper



Step 2 — Book first event with 1 ticket (default)

- Navigate to /events

- Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")

- Fill Full Name, Email (your email), Phone

- Click confirm button (.confirm-booking-btn)



Step 3 — Navigate to booking detail

- Click View My Bookings link

- Assert URL is /bookings

- Click the first View Details link

- Assert: text Booking Information is visible on the page


*/

const {test, expect} = require('@playwright/test');



async function loginAndGoToBooking(page) {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder('you@email.com').fill("divyanshusaxena41@gmail.com");
    await page.getByLabel('Password').fill("Test@123");
    await page.locator('#login-btn').click();
    await expect(page.locator("a span[class*='inline-flex']")).toBeVisible();
    
}
async function eventHelper(page) {
    await page.locator('#nav-events').click();
    const allEvents = page.locator('#event-card');
    await page.locator('#event-card').first().waitFor();
    await allEvents.nth(0).locator('#book-now-btn').click();

    await expect(page.locator('#ticket-count')).toHaveText('1');
    
}
test('Assignment 2', async({page})=>{

    //Test 1 — Single ticket booking is eligible for refund
    await loginAndGoToBooking(page);
    await eventHelper(page);
    await page.locator('#customerName').fill("Avinash Joshi");
    await page.locator('#customer-email').fill("brysonreed@yopmail.com");
    await page.locator('#phone').fill("+918824171320");
    await page.locator("button[type='submit']").click();

    await page.waitForLoadState('networkidle');
    await page.locator("//button[contains(text(),'View My Bookings')]").click();
    
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    await page.locator('#booking-card').first().waitFor();
    await expect(page.locator('#booking-card').first()).toBeVisible();
    const allBookingCards =  page.locator('#booking-card');
    allBookingCards.nth(0).locator("//button[text()='View Details']").click();

    await expect(page.locator("//h2[text()='Booking Information']")).toBeVisible();
    const bookRef = await page.locator("span[class*='text-indigo-600']").textContent();
    const eventTitle = await page.locator("h1[class*='text-2xl']").textContent();

    expect(bookRef.trim()[0]).toBe(eventTitle.trim()[0]);

    await page.locator('#check-refund-btn').click();

    await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
    // Assert spinner disappears within 6 seconds
    await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

    await expect(page.locator('#refund-result')).toBeVisible();

    expect((await page.locator('#refund-result').textContent()).split(". ")[0]).toBe("Eligible for refund");
    expect((await page.locator('#refund-result').textContent()).split(". ")[1]).toBe("Single-ticket bookings qualify for a full refund.");
    await page.locator('#logout-btn').click();


    //Test 2 — Group ticket booking is NOT eligible for refund

    await loginAndGoToBooking(page);
    await eventHelper(page);
    await page.locator("div button[class*='w-9']").nth(1).click({ clickCount: 2 });
    await expect(page.locator('#ticket-count')).toHaveText("3");
    await page.locator('#customerName').fill("Avinash Joshi");
    await page.locator('#customer-email').fill("brysonreed@yopmail.com");
    await page.locator('#phone').fill("+918824171320");
    await page.locator("button[type='submit']").click();


    await page.waitForLoadState('networkidle');
    await page.locator("//button[contains(text(),'View My Bookings')]").click();
    
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    await page.locator('#booking-card').first().waitFor();
    await expect(page.locator('#booking-card').first()).toBeVisible();
    allBookingCards.nth(0).locator("//button[text()='View Details']").click();

    await expect(page.locator("//h2[text()='Booking Information']")).toBeVisible();
    

    expect(bookRef.trim()[0]).toBe(eventTitle.trim()[0]);

    await page.locator('#check-refund-btn').click();

    await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
    // Assert spinner disappears within 6 seconds
    await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

    await expect(page.locator('#refund-result')).toBeVisible();

    expect((await page.locator('#refund-result').textContent()).split(". ")[0]).toBe("Not eligible for refund");
    expect((await page.locator('#refund-result').textContent()).split(". ")[1]).toBe("Group bookings (3 tickets) are non-refundable.");
    await page.locator('#logout-btn').click();






});
