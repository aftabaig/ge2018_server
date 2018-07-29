var fs = require('fs');
var csv = require('csv');
var Party = require("../../models").Party;
var Constituency = require('../../models').Constituency;
var Symbol = require('../../models').Symbol;
var Candidate = require('../../models').Candidate;

var input = fs.createReadStream('candidates-votes.csv');
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
    var votes = row["votes"].trim();
    if (votes == "-") {
        votes = "0"
    }
    
    var promise1 = Constituency.findOne({
        where: {
            name: constituencyId
        }
    });
    var promise2 = Symbol.findOne({
        where: {
            name: {
                $ilike: symbolName
            }
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
            
            var updateBy = {
                constituencyId: constituency.id
            }

            if (party != null) {
                updateBy["partyId"] = party.id
            }
            else {
                updateBy["symbolId"] = symbol.id
            }

            Candidate.update({
                score: votes
            }, {
                where: updateBy
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
