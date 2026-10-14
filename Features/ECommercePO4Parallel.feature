# we cannot run feature files paralley but we can run multiple scenarios parallely each feature can have mupltiple scenarios we need to give this command "npx cucumber-js features/ECommercePO4Parallel.feature --parallel 2 --exit" now "2" no. of scenarios you want to run we can change
# we can generate HTML report also by giving this command -> "npx cucumber-js features/ECommercePO4Parallel.feature --parallel 2 --exit --format html:cucumber-report.html"
# how to re run the failed cases sometimes it happens that some failed at first but passed in second we can achieve this by "retry" command -> "npx cucumber-js --tags "@Regression" --retry 1 --exit" or "npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-reporrt.html". here "1" signifies that rerun the failed case 1 more if it passes in second run than it will show passed in report otherwise failed
Feature: ECommerce Testing
    Scenario: Place the Order
    Given : Login in Ecommerce Application with "anshika@gmail.com" and "Iamking@000"
    When : Add the item to the cart "ZARA COAT 3"
    Then : Navigate to cart and verifying the "ZARA COAT 3" is added or not
    When : Ente right details at checkout screen like "213" and "Divyanshu Saxena" and "rahulshettyacademy" and "India" and "divyanshusaxena41@gmail.com" and place the order
    Then : Verify summary text like " Thankyou for the order. " on Order Summary Screen
    Then : Ver the order is present in Order History



    Scenario Outline: Error thrown at invalid credential 
    Given : E-comm Application with "<username>" and "<password>"
    Then : Err Mes is Visible
    Examples:
        | username           | password     | 
        | anshika@gmail.com  | Iamking@000  |
        | abc@yopmail.com    | Test@123     |   