
# We are integrating the playwirhgt with Cucumber.js . Cucumnber framework comes in different language based on landguage like Java, Pyhto , JavaScript, TypeScript. 

# What is Cucumber Framework. ? In Cucumber we made a feature file in which we describe test case in plain simple languege i.e Gherkin Language like Given, When and Then and each such scenario is linked to code that will actually run.

# How to install cucmber ?
# Run Command - npm install @cucumber/cucumber

# Once we create a fetrure file just like below then run this file by giving this command -> npx cucmber-js 
# Explaination of command -> npx will try to look for cucumber-js file in node module and this cucumber-js file will look for feature file in project as soons as we run the command it will throw the error that we have not create any step definition and we will copy those error
# we can also give tag in. feature file why bcz let say i have 100 test cases but now i want to run only 10 cases . so , i can give tagName to those test cases and then give command for those tags only - "npx cucumber-js --tags "@Regression" --exit. we can give multiple tagName to each test cases

#------------------------------------
# right now we are hardcoding the data in this test but later we will parameterise it to, parameterize it we need to do only one change i.e instead of "Scenario" it will be "Scenario Outline"
# we cannot run feature files paralley but we can run multiple scenarios parallely each feature can have mupltiple scenarios

Feature: ECommerce End to End Testing
    @Regression
    @TestCase1
    Scenario: Placing the Order
    Given : a login Ecommerce Application with "anshika@gmail.com" and "Iamking@000"
    When : Adding the item to the cart "ZARA COAT 3"
    Then : Navigating to cart and verifying the "ZARA COAT 3" is added or not
    When : Enter valid details at checkout screen like "213" and "Divyanshu Saxena" and "rahulshettyacademy" and "India" and "divyanshusaxena41@gmail.com" and place the order
    Then : Verify order summary text like " Thankyou for the order. " on Order Summary Screen
    Then : Verify the order is present in Order History 