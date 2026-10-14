//---------------------------------------Section 16 Lecture - 83 --------------------------------------------------------------------------

const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeexcelTest(searchText, replaceText, change, filePath) { 
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.coloumn+change.coloumChange);
    cell.value = replaceText;
    //in order to update in excel we have to write it also
    await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {
    let output = {row:-1,coloumn:-1}
    worksheet.eachRow( (row, rowNumber)=>
        {
           row.eachCell( (cell, cellNumber)=> 
            {
               // previously we printing the data
               if (cell.value === searchText){
                output.row = rowNumber;
                output.coloumn = cellNumber;
    
               }
            })
        })

        return output;

}


// now let say we want to update the price of Apple we need to update the corordinate as well colNumber by +2
writeexcelTest("Mango", "350", {rowChange:0,coloumChange:2}, "/Users/punchh_divyanshu/Documents/download.xlsx"); // agar niche wala test case apan nhi bnaye toh apn yha declare krenge
