var fs = require('fs');
var csv = require('csv');
var Symbol = require('../../models').Symbol;

var input = fs.createReadStream('symbols.csv');
var parser = csv.parse({
	delimiter: ',',
	columns: true
});

var transform = csv.transform(function(row) {
    var obj = {
        name: row["name"],
        number: row["number"]
    }
    Symbol.create(obj)
        .then(function() {

        })
        .catch(function(error) {

        }); 
});
input.pipe(parser).pipe(transform);
