var crypto = Npm.require('crypto'),
    aws = Npm.require('aws-sdk'),
    awsAccess = process.env['S3_ACCESS'],
    awsSecret = process.env['S3_SECRET']
    s3;

aws.config.update({
    accessKeyId: awsAccess,
    secretKeyAccess: awsSecret
});

s3 = new aws.S3();

var a3;

// Signs 'simple' (non-chunked) upload requests.
var signPolicy = function (data) {
    var base64Policy = base64(data);
        signature = crypto.createHmac('sha1', awsSecret)
            .update(base64Policy)
            .digest('base64');
    return signature;
}

var base64 = function (data) {
    return new Buffer(JSON.stringify(data)).toString('base64');
}



var policy =
{"expiration": "20014-01-01T00:00:00Z",
  "conditions": [ 
    {"bucket": "fhfarm-books"}, 
    ["starts-with", "$key", "uploads/"],
    {"acl": "public-read"},
    {"success_action_status": "200"},
    ["starts-with", "$Content-Type", ""],
    ["content-length-range", 0, 1048576]
  ]
};

AwsS3 = {
    hello: 'howdy'
};

Meteor.methods({
    doThings: function () {
        console.log(AwsS3.hello);
    },
    sign: function () {
        var data = policy;
        console.log('signed');
        return {
            policy: base64(data),
            signature: signPolicy(data)
        };
    }
 });