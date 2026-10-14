/*The purpose of this file is to create a utility function that will help us to perform some common actions like login, logout, etc. 
and we can use this utility function in our test cases to perform these actions 
instead of writing the same code again and again in our test cases. 
This will help us to reduce the code duplication and also it will make our test cases more readable and maintainable. 
So, we can create a utility function for login and logout and we can use it in our test cases.
*/


//First we will create class bcz in this folder we will create mutliple functions for API, Web etc. In API class we will have api related functions and in Web class we will have web related functions etc.
class APIUtils{
    

    constructor(apiContext, loginPayload){
        // Why on login payload bcz it is generic and we can use that login payload in other test cases as well. and if we declare that login payload inside the test case then it will not be accessible in other test cases.
        this.apiContext = apiContext
        this.loginPayload = loginPayload

    }
    
    async getToken(){
        const loginResponse =  await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
                {
                    data: this.loginPayload
                })
                const loginResponseJson = await loginResponse.json(); // this will convert the login response to json format and then we can use that json to fetch the token from the local storage.
                const token = loginResponseJson.token; // this will store the token in the variable so that we can use that token in other test cases. and we are using global variable because it will be accessible in all test cases.
                console.log(token);
                return token;

    }

    async createOrder(orderPayload){
        let response = {}; // this is an empty objectnwhich will store the reponse of order api and login api.
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
                {
                    data: orderPayload,
                    headers: {
                        'Authorization': response.token, // here we are passing the token in the header of the order api request because the order api is a protected api and it requires authentication to access that api. and we are passing the token in the header because the token is stored in the local storage and we can access that token from the local storage and then we can pass that token in the header of the api request to access that protected api.
                        'Content-Type': 'application/json'
                    }
                })
                const orderResponseJson = await orderResponse.json();
                const orderId = orderResponseJson.orders[0]; // this will store the orderId in the variable so that we can use that orderId in other test cases. and we are using global variable because it will be accessible in all test cases.
                console.log(orderId);
                response.orderID = orderId;
                return response;

    }

}
// Now we will export this class so that we can use this class in our test cases. and we can import this class in our test cases and then we can create an object of this class and then we can use that object to call the functions of this class in our test cases.
module.exports = {APIUtils};