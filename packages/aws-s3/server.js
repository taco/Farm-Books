var crypto = Npm.require('crypto'),
    io = Npm.require('socket.io');


io.configure(function () {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
});

var signPolicy = function (policy) {
    return crypto.createHmac('sha1', process.env['S3_SECRET'])
            .update(base64Policy(policy))
            .digest('base64');
};

var base64Policy = function (policy) {
    return new Buffer(JSON.stringify(policy)).toString('base64');
};


var buildPolicy = function () {
    return {
        expiration: new Date(new Date().getTime() + 5*60000).toISOString(),
        conditions: [
            {bucket: 'fhfarm-books'},
            ['starts-with', '$key', 'receipts/'],
            {acl: 'public-read'},
            {success_action_status: '200'},
            ['starts-with', '$Content-Type', 'image/']
        ]
    };
};

Meteor.methods({
    sign: function (policy) {
        policy = buildPolicy();

        return {
            policy: base64Policy(policy),
            signature: signPolicy(policy),
            accessKey: process.env['S3_ACCESS']
        };
    }
});