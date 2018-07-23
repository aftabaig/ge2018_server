var fs = require('fs');
var csv = require('csv');
var Constituency = require('../../models').Constituency;
var VotersDetail = require('../../models').VotersDetail;

var input = fs.createReadStream('voters-details-0.csv');
var parser = csv.parse({
	delimiter: ',',
	columns: true
});
var i = 0;

var transform = csv.transform(function(row) {

    i++;

    var constituencyId = row["constituency_id"];
    var males = row["males"];
    var females = row["females"];
    
    var promise = Constituency.findOne({
        where: {
            name: constituencyId
        }
    });
    promise.then(function (constituency) {
        VotersDetail.create({
            constituencyId: constituency.id,
            male: males,
            female: females
        }).then(function(details) {
            console.log("details created.");
        })
        .catch(function(error) {
            console.log("error: ", error);
            process.exit(1);
        })
    })
    .catch(function(error) {
        console.log("error: ", error);
        process.exit(1);
    })
});
input.pipe(parser).pipe(transform);
 