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
        console.log('INSERT', userId, doc);
        return true;
    },
    update: function (userId, doc) {
    	console.log('UPDATE', userId, doc);
    	return true;
    },
    remove: function () {
    	return false;
    }

});

