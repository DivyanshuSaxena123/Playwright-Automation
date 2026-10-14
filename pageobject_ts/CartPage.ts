import {test, Expect, Locator,Page} from '@playwright/test';
export class CartPage{
    //now we must be thinking why we import "Locator" as we are using page.locator
    page: Page;
    expect: Expect;
    cartItem: Locator;
    checkoutButton: Locator;

    constructor(page: Page, expect: Expect){
        this.page = page;
        this.expect = expect;
        this.cartItem = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.locator(".totalRow button");

    }

    async verifyCartItem(){
        const bool = await this.cartItem.isVisible(); // vvv Important
        this.expect(bool).toBeTruthy();
    }



    async navigateToCheckout(){
        await this.checkoutButton.click();
    }
}

