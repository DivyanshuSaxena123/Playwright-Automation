class CartPage{

    constructor(page, expect){
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

module.exports = {CartPage};