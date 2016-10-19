var http = require('http')
var port = process.env.port || 1337;
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
var getRow = "SELECT Description,Priority,Status from Tasks;"
var insertRow = "INSERT INTO Tasks (Description,Priority,Status)VALUES ('Sleep','High','Pending');" 
var updateRow = "UPDATE Tasks SET Priority='Low' WHERE Status='new';"
var deleteRow = "DELETE FROM Tasks where Status = 'done';";
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);


var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'sysgain',  
        password: 'ThisIsPassword@123',  
        server: 'p868gm7zdb.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'myDB'}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement(deleteRow);
    });  

  
    function executeStatement(query) {  
        request = new Request(query , function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        connection.execSql(request);  
        console.log('All Done'); 
    }  