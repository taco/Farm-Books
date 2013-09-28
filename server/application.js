Meteor.startup(function () {

});

    Meteor.call('S3config', {
        key: process.env['S3_ACCESS'],
        secret: process.env['S3_SECRET'],
        bucket: 'fhfarm-test1'
    });

Meteor.publish('transactions', function (id) {
    return (!id)
        ? Transactions.find()
        : Transactions.fineOne(id);
});

Meteor.methods({
    s3Complete:function(url, context){
        console.log('Add '+url+' to the id of '+context);
    },
    nodeVersion: function () {
        console.log('NODE-VERSION', process.version);
        return process.version;
    }
});