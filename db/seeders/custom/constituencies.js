var fs = require('fs');
var csv = require('csv');
var Constituency = require('../../models').Constituency;

var input = fs.createReadStream('constituencies-pp.csv');
var parser = csv.parse({
	delimiter: ',',
	columns: true
});

var transform = csv.transform(function(row) {
    var obj = {
        name: row["name"],
        area: row["area"],
        assemblyId: row["assembly_id"]
    }
    Constituency.create(obj)
        .then(function() {
            console.log("created");
        })
        .catch(function(error) {

        }); 
});
input.pipe(parser).pipe(transform);
