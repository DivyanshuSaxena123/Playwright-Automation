// The purpose of this class is to consolidate and keep copy of all page objects. Here we will declare all the pageObject
import {LoginPage} from "./Login";
import {DashboardPage} from "./DashboardPage";
import {CartPage} from "./CartPage";
import {CheckoutPage} from "./CheckoutPage";
import {OrderSummaryPage} from "./OrderSummaryPage";
import {OrderListPage} from "./OrderListPage";
import {Page,Expect} from '@playwright/test';


export class PageObjectManager {
    //we have declare login as class memeber 
    page: Page;
    expect: Expect;
    login : LoginPage;
    dashboard: DashboardPage;
    cart: CartPage;
    checkout: CheckoutPage;
    orderSummary: OrderSummaryPage;
    orderList: OrderListPage;

    constructor(page:Page, expect:Expect){
        this.page = page;
        this.expect = expect;
        this.login = new LoginPage(this.page);
        this.dashboard = new DashboardPage(this.page);
        this.cart = new CartPage(this.page, this.expect);
        this.checkout = new CheckoutPage(this.page, this.expect);
        this.orderSummary = new OrderSummaryPage(this.page, this.expect);
        this.orderList = new OrderListPage(this.page, this.expect);
    }

    getLoginPage(){
        return this.login;
    }

    getDashboardPage(){
        return this.dashboard;
    }

    getCartPage(){
        return this.cart;
    }

    getCheckoutPage(){
        return this.checkout;
    }

    getOrderSummaryPage(){
        return this.orderSummary;
    }

    getOrderListPage(){
        return this.orderList;
    }

}