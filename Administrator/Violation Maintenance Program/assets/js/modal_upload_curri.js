let inputexcel = document.getElementById('file_path');
let excelfilename = document.getElementById('file-name');
let inputSelectFile = document.getElementById('uploadExcelFile');
var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

inputexcel.addEventListener('change', function(event){
    if (regex.test(inputexcel.value.toLowerCase())) {
        let uploadFileName = event.target.files[0].name;
        excelfilename.textContent = uploadFileName;
    }
}) 

document.getElementById('upload_bttn').addEventListener('click', function() {
    document.querySelector('#modal_upload_curri').style.display = 'flex';
});
document.querySelector('#close_modal0').addEventListener('click', function(){
    document.querySelector('#modal_upload_curri').style.display = 'none'; 
    excelfilename.textContent = "";
    if (newtableNum > 0){
        document.getElementById("preview_table").remove();
        newtableNum = 0;
        if (inputexcel.value.length != 0){
            inputSelectFile.reset();
        }
    }
});

document.querySelector('#close_modal9').addEventListener('click', function(){
    document.querySelector('#modal_upload_curri').style.display = 'none';
    excelfilename.textContent = "";
    if (newtableNum > 0){
        document.getElementById("preview_table").remove();
        newtableNum = 0;
        if (inputexcel.value.length != 0){
            inputSelectFile.reset();
        }
    }
});

window.onclick = function(event) {
    if (event.target == document.querySelector('#modal_upload_curri')) {
        document.querySelector('#modal_upload_curri').style.display = "none";
        excelfilename.textContent = "";
        if (newtableNum > 0){
            document.getElementById("preview_table").remove();
            newtableNum = 0;
            if (inputexcel.value.length != 0){
                inputSelectFile.reset();
            }
        }
    }
};

var tableNum = 0;


    //Reference the FileUpload element.
    var fileUpload = document.getElementById("file_path");
    fileUpload.addEventListener('change', function(){
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        GetTableFromExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        GetTableFromExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    });
    function GetTableFromExcel(data) {
        //Read the Excel File data in binary
		var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //get the name of First Sheet.
        var Sheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
        
        newtableNum = tableNum;
        pretableNum = newtableNum;

        newtableNum = tableNum + 1;

        if(pretableNum == 0 && newtableNum == 1){

            pretableNum = newtableNum;
            newtableNum = tableNum + 1;

            //Create a HTML Table element.
            var myTable  = document.createElement("table");
            myTable.className = "preview_table";
            myTable.setAttribute("id", "preview_table");

             //Add the header row.
            var row = myTable.insertRow(-1);
            row.className = "preview_title";

            //Add the header cells.
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = "PCODE";
            row.appendChild(headerCell);
    
            headerCell = document.createElement("TH");
            headerCell.innerHTML = "Description";
            row.appendChild(headerCell);

            //Add the data rows from Excel file.
            for (var i = 0; i < excelRows.length; i++) {
                //Add the data row.
                var row = myTable.insertRow(-1);
                row.className = "preview_data";
    
                //Add the data cells.
                var cell = row.insertCell(-1);
                cell.innerHTML = excelRows[i].PCODE;
    
                cell = row.insertCell(-1);
                cell.innerHTML = excelRows[i].Description;
    
            }

            var ExcelTable = document.getElementById("preview_table_content");
            ExcelTable.innerHTML = "";
            ExcelTable.appendChild(myTable);
            
        }
        else if (pretableNum > newtableNum){

            document.getElementById("preview_table").remove();

            pretableNum = newtableNum;
            newtableNum = tableNum + 1;

            //Create a HTML Table element.
            var myTable  = document.createElement("table");
            myTable.className = "preview_table";
            myTable.setAttribute("id", "preview_table");

             //Add the header row.
            var row = myTable.insertRow(-1);
            row.className = "preview_title";

            //Add the header cells.
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = "PCODE";
            row.appendChild(headerCell);
    
            headerCell = document.createElement("TH");
            headerCell.innerHTML = "Description";
            row.appendChild(headerCell);

            //Add the data rows from Excel file.
            for (var i = 0; i < excelRows.length; i++) {
                //Add the data row.
                var row = myTable.insertRow(-1);
                row.className = "preview_data";
    
                //Add the data cells.
                var cell = row.insertCell(-1);
                cell.innerHTML = excelRows[i].PCODE;
    
                cell = row.insertCell(-1);
                cell.innerHTML = excelRows[i].Description;
    
            }

            var ExcelTable = document.getElementById("preview_table_content");
            ExcelTable.innerHTML = "";
            ExcelTable.appendChild(myTable);
            
        };

       
 
        
    };
