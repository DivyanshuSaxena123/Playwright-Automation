/*
There is one more thing that we will learn about in Cucumber i.e "Hooks" are used to setup and teardown the environment before and after each scenario 
just like we "beforeAll" , "afterAll" annotations what does beforeAll annotation does it actually run that specific piece of code before running any text


we can check the playwright documention how to use hooks in playwright. so, we will optimize our steps.js code as we know  that before running any scenario we have to always login in the application first
*/

const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const {PageObjectManager} = require('../.././tests/pageobjects/PageObjectManager');
const{expect} = require('@playwright/test');
const { timeout } = require("node:dns");

/* We can also write. "Before" like Before('text just like we do in Give, When and Then', async function()) but since it is applicable for scenarios . 
Before, After -  It will run before every scenario if you have 5 scenario then it will run 5 times . 
BeforeAll, AfterAll -  It will run once before all 5 scenarios
BeforeStep - It will run before each step of scenario
*/
Before({timeout: 100*1000},async function () {
    
        const browser = await playwright.chromium.launch({headless: false}) //we can also give property like headless in lauch
        const context = await browser.newContext();
        this.page =  await context.newPage(); // if in some scenario we are using page then by using "world constructor" we can achieve this
    
        this.poManager = new PageObjectManager(this.page, expect);
});



// see playwright documentation and we can also give tag Name in Before Step and After Step like this
/*
BeforeStep({tag: "@Validation"}function(){

});
*/
BeforeStep(function(){

});

// see playwright documentation
AfterStep(async function({ result }){
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot1.png'});
    }

});




After(function (){

    // since we have nothing to take action in this so, we will print the dummy data
    console.log("I am last to execute");

});


/*
Since we can give multiple tag to each scenario so, there are some cases

1) BeforeStep({s: "@Validation"}function(){

});  
And This hooks will executed before scenarios tagged with @Validation


2) BeforeStep({tags: "@Validation and Regression"}function(){

});  
And This hooks will executed before scenarios tagged with @Validation and @Regression both need to there if any one them is missiing it will give error

3) BeforeStep({tags: "@Validation or @Regression"}function(){

});  
And This hooks will executed before scenarios tagged with @Validation or @Regression either one them need to be present

-----------------------------------
we can also write like without giving "tags" key
3) BeforeStep({"@Validation"}function(){

});  
And This hooks will executed before scenarios tagged with @Validation or @Regression either one them need to be present

*/
