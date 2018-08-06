var fs = require('fs');
var csv = require('csv');
var Constituency = require('../../models').Constituency;
var Candidate = require('../../models').Candidate;

var start = async() => {
    try {
        var constituencies = await Constituency.findAll()
        constituencies.forEach(async (constituency) => {
            console.log(constituency.name);
            var candidates = await Candidate.findAll({
                where: {
                    constituencyId: constituency.id
                },
                order: [
                    ['score', 'DESC']
                ]
            });
            
            var awaited = false;
            candidates.forEach(async (candidate, index) => {
                console.log(candidate.fullName);
                if (index == 0) {
                    if (candidate.score > 0) {
                        candidate.status = 1;
                    }
                    else {
                        candidate.status = null;
                        awaited = true;
                    }
                }
                else {
                    if (!awaited) {
                        candidate.status = 0;
                    }
                    else {
                        candidate.status = null;
                    }
                }
                await candidate.save();
            })
        })
    } catch (e) {
        console.log("error");
        process.exit(1);
    }
}
start();
