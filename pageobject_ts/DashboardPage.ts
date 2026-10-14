import {test, Expect, Locator, Page} from '@playwright/test';
export class DashboardPage {
    page:Page;
    products: Locator;
    productsText:Locator
    cartButton:Locator;
    constructor(page:Page){
        // all the locators of dashboard page will be declared here
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='cart']");

    }

    async searchProduct(productName:string){
        await this.products.first().waitFor(); // we are just making sure all item loaded successfully
        // //Now we will fetch all titles
        const allTitles = await this.productsText.allTextContents();
        const products = this.products;
        const count = await products.count();
        
        for(let i=0; i<count; i++)
        {
             // Isse apan title box ke andar hain let text lene ke liye andar jana pdega
            if (await products.nth(i).locator('b').textContent() == productName) 
            {
                // add to card
                //await products.nth(i).locator("button").last().click();
                // or
                 await products.nth(i).locator("text=Add To Cart").last().click()

            }
        }
    }

    async navigateToCart(){
        await this.cartButton.click();
        await this.page.locator("div li div").first().waitFor();
    }
}

