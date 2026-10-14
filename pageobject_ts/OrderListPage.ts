import {test, Expect, Locator, Page} from '@playwright/test';
export class OrderListPage {
    page:Page;
    expect:Expect;
    orderListPageAssertion:Locator;
    allOrdersList:Locator;
    orderDetails:Locator;


    constructor(page:Page, expect:Expect){
        this.page = page;
        this.expect = expect;
        this.orderListPageAssertion = page.locator('div h1');
        this.allOrdersList = page.locator('tbody tr');
        this.orderDetails = page.locator('.col-text');

    }


    async verifyOrderListPageandClickingOnOrderPlaced(orderId:any){
        //assertion that we have landed on order page
        await this.expect(this.orderListPageAssertion).toHaveText("Your Orders");

        //Now we fetch all order 
            const allOrders = this.allOrdersList;
            const count3 = await allOrders.count();
            for(let m=0; m<count3; m++){
                if (orderId.includes(await allOrders.nth(m).locator('th').textContent())) { // here we are checking whether the orderId which we have grabbed is present in the order page or not. and if it is present then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.
                    //clcik on view button
                    await allOrders.nth(m).locator("button").first().click(); // here we are using ".." to go up to the parent element and then we are locating the button inside that parent element and then we are clicking on that button. and this button is the view button for that order.
                    break;
                }
            }
            const orderIdDetails = await this.orderDetails.textContent(); // here we are grabbing the orderId details from the order details page and then we will compare it with the orderId which we have grabbed from the order confirmation page. and if it is same then it will return true otherwise it will return false. and if it returns true then the test will pass otherwise it will fail.    
            this.expect(orderId.includes(orderIdDetails)).toBeTruthy();
        

    }
}
