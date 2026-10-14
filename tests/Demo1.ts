/*
Here we learn about Typescript

#1. TypeScript support static typing
*/

let message1 : string = "Hello"; // #1 as we know that in java when we declare any variable we have to mention datatype also but in javascript it automatically detect whether it is string or int or anyother datatype but in typescript we have to mention datatype also while declaring the variable
console.log(message1);
let age1 : number = 2;
console.log(age1);
let isActive : boolean = false;
console.log(isActive);
let numArray1 : number[] = [1,2,3];

let data : any = "by declaring any it will behave as Javascript";
data = 42;

//---above we have learn basic of how to declare the variable

// funxtions

function add1(a:number, b: number) : number  // since we are returning the sum
{
    return a+b;
}
console.log(add1(3,4));

//object

let user1 :{name: string, age: number} = {name: "Anshu", age: 34};

// see video

//Note :- 
/*
As we know that in javascript 
1. if we want to export a file - at the end of file we mention - "module.exports={class name} but in typescript we write at start like this - export class XYZ {}
2. In javascript if we want to import any class "const{}=require("file path")" but in typescript like this - import {fileName} from 'filepath'
*/