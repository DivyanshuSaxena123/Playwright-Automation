Feature: ECommerce Parameterization
    Scenario Outline: Validating Error thrown at invalid credential with multiple datasets
    Given : Ecommerce2 Application with "<username>" and "<password>"
    Then : Error Message is Displayed
    Examples:
        | username          | password    | 
        | anshika@gmail.com | Iamking@000 |
        | abc@yopmail.com   | Test@123    |  