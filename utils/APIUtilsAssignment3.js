class APIUtilsAssignment3{
    

    constructor(apiContext, loginPayload){
        // Why on login payload bcz it is generic and we can use that login payload in other test cases as well. and if we declare that login payload inside the test case then it will not be accessible in other test cases.
        this.apiContext = apiContext
        this.loginPayload = loginPayload

    }
    
    async getToken(){
        let response = {};
        const loginResponse =  await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", 
                {
                    data: this.loginPayload
                })
                const loginResponseJson = await loginResponse.json(); // this will convert the login response to json format and then we can use that json to fetch the token from the local storage.
                const token = loginResponseJson.token; // this will store the token in the variable so that we can use that token in other test cases. and we are using global variable because it will be accessible in all test cases.
                console.log(token);
                response.token = token;
                return response;

    }
}
module.exports = {APIUtilsAssignment3};