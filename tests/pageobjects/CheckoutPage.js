class CheckoutPage {

    constructor(page, expect){
        this.page = page;
        this.expect = expect;
        this.fieldsLabel = page.locator(".payment__cc form div div div[class='title']");
        this.countrySelection = page.locator("[placeholder*='Country']");
        this.dropDown = page.locator(".ta-results");
        this.dropDownOptions = page.locator(".ta-results button");
        this.assertionEmailLocator = page.locator(".user__name [type='text']");
        this.navigateToOrderSummaryButton = page.locator(".action__submit");
    }

    //fill card details on checkout page
    async fillCardDetails(cvv,cardName,coupon,country,emailID){

    const fieldLabel = this.fieldsLabel;
    const count2 = await fieldLabel.count();
    for(let k=0; k<count2; k++){
    const label = (await fieldLabel.nth(k).textContent()).trim(); // ✅ trim whitespace
    const parentLocator = fieldLabel.nth(k).locator('..'); // ✅ go up to parent

    if (label === "CVV Code ?") {
        await parentLocator.locator('.input.txt').fill(cvv);
    } else if (label === "Name on Card") {
        await parentLocator.locator('.input.txt').fill(cardName);
    } else if (label === "Apply Coupon") {
        await parentLocator.locator('.input.txt').fill(coupon);
    }

    }
  


    //Dynamic Dropdow Handling
    await this.countrySelection.pressSequentially(country); // "PrssSequentially" method is used to type the text in the input field one by one like "i" then "n" then "d" and so on. it will work like human typing. and it will also trigger the events like "onchange" or "oninput" which are triggered when we type in the input field. and it will also work with the auto-suggest dropdowns.

    //now we will wait for the dropdown to load
        await this.dropDown.waitFor(); // here ".ta-results" is the locator for the dropdown container and we are using first() because there are multiple dropdowns on the page but we want to wait for the first dropdown to load. and then we will click on the desired option from the dropdown
        for(let j=0; j<await this.dropDownOptions.count(); j++){
            if(await this.dropDownOptions.nth(j).textContent() == " India"){
                await this.dropDownOptions.nth(j).click();
                break;
            }
        }
        
    
        //Now we will put some assertion like we have logged in with valid emailID
        this.expect(this.assertionEmailLocator.first()).toHaveText(emailID); // this will check whether the emailID which we have logged in is present in the user name or not. and if it is present then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.
    
    

    }

    async navigateToOrderSummary(){
        await this.navigateToOrderSummaryButton.click();

    }
}
module.exports = {CheckoutPage};