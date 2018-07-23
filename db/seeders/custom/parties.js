var fs = require('fs');
var csv = require('csv');
var Symbol = require('../../models').Symbol;
var Party = require('../../models').Party;

var input = fs.createReadStream('parties.csv');
var parser = csv.parse({
	delimiter: ',',
	columns: true
});

var transform = csv.transform(function(row) {
    var name = row["name"];
    var symbolId = row["symbol_id"];
    var symbol = {}
    Symbol.findOne({
        where: {
            number: symbolId
        }
    })
    .then(function(obj) {
        symbol = obj
        var p = {
            name: row["name"],
            symbolId: symbol.id
        }
        Party.create(p)
        .then(function() {

        })
        .catch(function(error) {

        }); 
    })
});
input.pipe(parser).pipe(transform);
