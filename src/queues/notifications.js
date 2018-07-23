const kue = require("kue");
const queue = kue.createQueue();

queue.on('ready', () => {
    console.log("I'm ready");
});

queue.on('error', (error) => {
    console.log(error);
});

function sendNotification(data, done) {
    queue.create('notification', data)
        .priority('high')
        .attempts(4)
        .backoff(true)
        .removeOnComplete(true)
        .save(e => {
            if (e) {
                console.log(e);
                done(e);
            }
            else {
                done();
            }
        });
}

module.exports = {
    send: (data, done) => {
        sendNotification(data, done);
    }
}