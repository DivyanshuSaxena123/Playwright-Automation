//---------------------------------------Section 16 Lecture - 83 --------------------------------------------------------------------------

/*
In this we will optimize the "excelUsingJavaScript2" code
*/

// we can make seprate func for readFile and writeFile
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
//writeexcelTest("Mango", "350", {rowChange:0,coloumChange:2}, "/Users/punchh_divyanshu/Documents/download.xlsx"); // agar niche wala test case apan nhi bnaye toh apn yha declare krenge


// In this test case we will upload the update excel to the website. Full scenario is download the excel -> update the excel -> reupload the excel -> verify changes the reflected on portal or not
test('Upload-Download Upated Excel', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const searchText = "Banana";
    const updatedPrice = "900";
    const filePath = "/Users/punchh_divyanshu/Downlods/download.xlsx";
    // we will put some sort of wait here as it can take some time on downloading the excel
    const downloadPromise = page.waitForEvent('download'); // First we wait for event to happen
    await page.locator("#downloadButton").click();
    const download = await downloadPromise; // we wait for event to complete
    await download.saveAs(filePath);

    await writeexcelTest(searchText, updatedPrice, {rowChange:0,coloumChange:2}, filePath);
    await page.locator("#fileinput").click() //after click this it will open a window but playwright can't perform action "window level"
    await page.locator("#fileinput").setInputFiles(filePath); // but this "setInputFiles" will only work when it has this attribut "type=file" and also 1 more this is used bcz playwright can't perform action on window level so, we have to use this method to upload the file

    //first we will search for "mango" in table present in websote
    const textlocator = page.getByText(searchText); // getByText will scan the entire the page and return the element which has this text.
    const desiredRow = page.getByRole('row').filter({has: textlocator}) // getByRole will return all the rows present in table and then we will filter the row which has "mango" text. so, it will return the row element which has "mango" text
    expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedPrice); // instead of returning of element it will return only mango row pricr



    // now we will put some assertion also to verify value is updated or not
 
})