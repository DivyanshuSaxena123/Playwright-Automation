import {test, Expect, Locator, Page} from '@playwright/test';
export class OrderSummaryPage {
    page:Page;
    expect:Expect;
    verifyText:Locator;
    verifyOrderId:Locator;
    orderListButton:Locator;
    waitForOrderListPage:Locator;


    constructor(page:Page, expect:Expect) {
        this.page = page;
        this.expect = expect;
        this.verifyText = page.locator(".hero-primary");
        this.verifyOrderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderListButton =  page.locator("button[routerlink*='myorders']");
        this.waitForOrderListPage = page.locator("tbody");

    }


    async verifyOrderSummary(text:string){
        let response: { orderId: string | null } = { orderId: null };
        await this.expect(this.verifyText).toHaveText(text);
        
        //now we grab orderid
        const orderId = await this.verifyOrderId.textContent();
        response.orderId = orderId;
        console.log(orderId);
        return response;
        
    }

    async navigateToOrderListPage(){
        await this.orderListButton.click();// it might take some time to load 
        await this.waitForOrderListPage.waitFor(); 
    }
}
