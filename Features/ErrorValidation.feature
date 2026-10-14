Feature: ECommerce Validation
    @Validation
    @TestCase2
    Scenario: Validating Error thrown at invalid credential
    Given : a login Ecommerce2 Application with "anshika@gmail.com" and "Iamking@000"
    Then : Verify Error Message is Displayed 