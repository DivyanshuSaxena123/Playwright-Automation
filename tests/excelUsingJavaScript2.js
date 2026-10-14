//--------------------------------------Sector 16 - Lecture 82 ------------------------------------------
// TestCase - Need to change the "Apple" with "Iphone" in the sheet. In order to chage the we need the coordinate of that particular cell like rowNumber and cellNumber


const ExcelJs = require('exceljs');

async function excelTest() {
    let output = {row:-1,coloumn:-1} //-1 is used as a DEFAULT value meaning "not found" or "not set yet"  .Just like array.indexOf() returns -1 when element is not found
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("/Users/punchh_divyanshu/Documents/download.xlsx")
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow( (row, rowNumber)=>
    {
       row.eachCell( (cell, cellNumber)=> 
        {
           // previously we printing the data
           if (cell.value === "Apple"){
            //console.log(rowNumber);
            //console.log(cellNumber);
            output.row = rowNumber;
            output.coloumn = cellNumber;

           }
        })
    })

    const cell = worksheet.getCell(output.row, output.coloumn);
    cell.value = "Iphone";
    //in order to update in excel we have to write it also
    await workbook.xlsx.writeFile("/Users/punchh_divyanshu/Documents/download.xlsx")
}

excelTest();