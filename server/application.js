Meteor.startup(function () {
    //console.log(io);

});


Meteor.publish('transactions', function (id) {
    return (!id)
        ? Transactions.find()
        : Transactions.fineOne(id);
});


Transactions.allow({
    insert: function (userId, doc) {
        console.log(userId, doc);
        return true;
    }
});

