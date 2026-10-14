//---------------------------------------Section 16 Lecture - 81 --------------------------------------------------------------------------
/*
In this section we will read about all the operation that we can perform on excel sheet like reading, writing etc
we can the download the sample excel from - "https://rahulshettyacademy.com/upload-download-test/index.html"
*/

/*
Step 1 - In order to perform any action in Excel like read, write or manupilate we need to install "exceljs" node module
in order to use this we will create a directory and install npm in it

1) mkdir ExcelUtilJS
2) npm init
3) npm install exceljs
and if we want to add "exceljs" in package.json then run this command
4) npm install exceljs --savedev

  or 

simply run   "npm install exceljs" in vscode terminal of existing project


-> And to run javascript code - node "projectFileName" so, here our command will be - "node tests/excelUsingJavaScript.js"
*/

//-----------------------------------------------------------------------------------------------

//Step 1 : First we have to import "exceljs" package
const ExcelJs = require('exceljs');

async function excelTest() {
    //Step 2 : Now, we will create an object of "ExcelJs"
    const workbook = new ExcelJs.Workbook();
    //Step 3 : We will give the path where our excelsheet is present in the system. but since we know "exceljs" library can handle both xslx and json we have to specify that we are looking for xslx
    // Very imp point to note here is as we know javascript is async language so, we either need add "await" in step 3 and all code from step 1 to step 5 need to declare inside "async func"  or 2nd way- i will comment this just for knowledge. we will user "1st"
    await workbook.xlsx.readFile("/Users/punchh_divyanshu/Documents/download.xlsx")

    /*          2nd Method

    workbook.xlsx.read("/Users/punchh_divyanshu/Documents/download.xslx").then(() => 
        {
             const worksheet = workbook.getWorksheet('Sheet1');
             worksheet.eachRow( (row, rowNumber)=>
            {
                row.eachCell( (cell, cellNumber)=> 
                {
                console.log(cell.value);
                })
            })
        });

    */


    //Step 4 : Now, we have to move to specific "sheet" present in workbook
    const worksheet = workbook.getWorksheet('Sheet1');
    //Step 5 : Now we will perform our test case - Our test case is we have to read and print the entire row and coloumn data in console
    //Note : Just for knwolege. eachRow() is a function which require callback func as an argument
    worksheet.eachRow( (row, rowNumber)=>
    {
    //eachRow will iterate over first row, now we have to hove over each coloum of first row
       row.eachCell( (cell, cellNumber)=> 
        {
           console.log(cell.value);
        })
    })
}

excelTest();





