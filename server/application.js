Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish('transactions', function (id) {
    return (!id)
        ? Transactions.find()
        : Transactions.fineOne(id);
});