Meteor.startup(function () {

});

Meteor.publish('transactions', function (id) {
    return (!id)
        ? Transactions.find()
        : Transactions.fineOne(id);
});

Meteor.methods({
    s3Complete:function(url, context){
        console.log('Add '+url+' to the id of '+context);
    }
});

//console.log('end of shit');