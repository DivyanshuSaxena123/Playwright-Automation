// The purpose of this class is to consolidate and keep copy of all page objects. Here we will declare all the pageObject
const {LoginPage} = require('./Login');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderSummaryPage} = require('./OrderSummaryPage');
const {OrderListPage} = require('./OrderListPage');


class PageObjectManager {

    constructor(page, expect){
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
module.exports = {PageObjectManager};