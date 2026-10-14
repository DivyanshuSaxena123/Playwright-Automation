/*
So, In this we will learn how to make page-objects meaning. Intially, we 
were implement everything ina single file All action , locators etc

Purpose of making Page Object Mode. we will declare all the locator of that particular page in "js file" like Login.js, Dashboard.js etc
*/

//First we create class
class LoginPage {

    //declare the constructor
    constructor(page){
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.signInButton = page.locator('#login');

    }


    async landingPage(url){
        // to make use of page we have to declare inside constructor
        await this.page.goto(url)
    }


    //here we will declare reusable method like login above we have declared just locators here we will do action perfomed on those locator
    async validLogin(email, password){
        await this.userEmail.type(email);
        await this.userPassword.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

//in order to use this class throughtout the project we need to export
module.exports={LoginPage};