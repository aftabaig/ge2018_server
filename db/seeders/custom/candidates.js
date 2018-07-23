var fs = require('fs');
var csv = require('csv');
var Party = require("../../models").Party;
var Constituency = require('../../models').Constituency;
var Symbol = require('../../models').Symbol;
var Candidate = require('../../models').Candidate;

var input = fs.createReadStream('candidates-missing.csv');
var parser = csv.parse({
	delimiter: ',',
	columns: true
});
var i = 0;

var transform = csv.transform(function(row) {

    i++;

    var constituencyId = row["constituency_id"];
    var candidateName = row["candidate_name"];
    var symbolName = row["symbol_name"].trim();
    
    var promise1 = Constituency.findOne({
        where: {
            name: constituencyId
        }
    });
    var promise2 = Symbol.findOne({
        where: {
            name: symbolName
        }
    });

    Promise.all([promise1, promise2])
    .then(function(values) {

        var constituency = values[0];
        var symbol = values[1];

        if (constituency == null || symbol == null) {
            console.log("constituency: ", constituency);
            console.log("symbol: ", symbol);
            console.log("Error at line #", i);
            console.log("row: ", row);
            process.exit(1);
        }

        Party.findOne({
            where: {
                symbolId: symbol.id
            }
        })
        .then(function(party) {
            var obj = {
                fullName: candidateName,
                constituencyId: constituency.id,
            }
            if (party != null) {
                obj["partyId"] = party.id
            }
            else {
                obj["symbolId"] = symbol.id
            }
            Candidate.create(obj).then(function(candidate) {
                console.log("candidate created.");
            })
            .catch(function(error) {
                console.log(candidateName, "error: ", error);
                process.exit(1);
            })
        })
    })
    .catch(function(error) {
        console.log(candidateName, "error: ", error);
        process.exit(1);
    })
});
input.pipe(parser).pipe(transform);
