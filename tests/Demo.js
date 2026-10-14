/*
Here we learn about javascript 

#1. Javascript support dynamic typing
*/

let message = "Hello"; // #1 as we know that in java when we declare any variable we have to mention datatype also but in javascript it automatically detect whether it is string or int or anyother datatype
message = 2; // this is still valid bcz Javascript is such a dynamic language that at runtime itself it will change the datatype and store the update data in the variable but we cannot do the same in typescript
console.log(message);
let age = 20;
console.log(age);
let numArray = [1,2,3];

//functions
function add(a,b) // since we are returning the sum
{
   return a+b;
}
console.log(add(3,4));

//objects
let user = {name: "Anshu", age: 34};

