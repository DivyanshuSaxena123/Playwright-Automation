const{test, request, expect} = require('@playwright/test');
const{APIUtilsAssignment3} = require('../utils/APIUtilsAssignment3');  //Now in order to use APIUtils class methods we need to import that class in this test file

const loginPayload = {email:"divyanshusaxena41@gmail.com", password:"Test@123"};
let response;
const SIX_EVENTS_RESPONSE = {
    data: [
      { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
      { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
      { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
      { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
      { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
      { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
  };


const FOUR_EVENTS_RESPONSE = {
    data: [
      { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
      { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
      { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
      { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
  };
  
//loginAndGoToEvents(page) helper
test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiutils = new APIUtilsAssignment3(apiContext, loginPayload);
    response = await apiutils.getToken();

});


test('Assignment 3 Part 1', async({page})=>{
  await page.addInitScript(value =>
    {
        window.localStorage.setItem('eventhub_token', value); // here we are setting the token in the local storage and then we can use that token to login to the application without entering the credentials. and this method will execute before the page is loaded and then we can use that token to login to the application without entering the credentials.
    },response.token);

    await page.goto("https://eventhub.rahulshettyacademy.com/");

    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12", 
          route => 
              route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(SIX_EVENTS_RESPONSE)
      }))
      await page.goto('https://eventhub.rahulshettyacademy.com/events');
      const eventCards = page.locator('#event-card');
      await page.locator('#event-card').first().waitFor();
      await expect(page.locator('#event-card').first()).toBeVisible();
      await expect(eventCards).toHaveCount(6);

      await expect(page.locator("//span[contains(text(),'Your sandbox holds up to')]")).toBeVisible();
      const text = await page.locator("//span[contains(text(),'Your sandbox holds up to')]").textContent();
      await expect(text).toContain("9 bookings");
       

})


test('Assignment 3 Part 2', async({page})=>{
  await page.addInitScript(value =>
    {
        window.localStorage.setItem('eventhub_token', value); // here we are setting the token in the local storage and then we can use that token to login to the application without entering the credentials. and this method will execute before the page is loaded and then we can use that token to login to the application without entering the credentials.
    },response.token);

    await page.goto("https://eventhub.rahulshettyacademy.com/");

    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12", 
          route => 
              route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(FOUR_EVENTS_RESPONSE)
      }))
      await page.goto('https://eventhub.rahulshettyacademy.com/events');
      const eventCards = page.locator('#event-card');
      await page.locator('#event-card').first().waitFor();
      await expect(page.locator('#event-card').first()).toBeVisible();
      await expect(eventCards).toHaveCount(4);

      await expect(page.locator("//span[contains(text(),'Your sandbox holds up to')]")).not.toBeVisible();
      
       

})





