Meteor.startup(function () {
    // if (AwsS3) {
    //     console.log('yes');
    // } else {
    //     console.log('no');
    // }
    // 
    Meteor.call('doThings');
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