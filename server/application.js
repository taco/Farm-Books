Meteor.startup(function () {
    //console.log(io);
    console.log('Categories');
    console.log(Categories.find().fetch());


    if (Categories.find().count() !== 10) {
        Categories.remove({});
        Categories.insert({index: 0, name: ''});
        Categories.insert({index: 1, name: 'Business'});
        Categories.insert({index: 2, name: 'Equipment'});
        Categories.insert({index: 3, name: 'Hay, Feed, & Shavings'});
        Categories.insert({index: 4, name: 'Horse Shoes'});
        Categories.insert({index: 5, name: 'Lessons & Shows'});
        Categories.insert({index: 6, name: 'Property Maintenance'});
        Categories.insert({index: 7, name: 'Tack & Supplies'});
        Categories.insert({index: 8, name: 'Truck Expenses'});
        Categories.insert({index: 9, name: 'Other'});
    }

});


Meteor.publish('transactions', function (id) {
    return Transactions.find()
        //: Transactions.fineOne(id);
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
    	return true;
    }

});


Meteor.publish('categories', function(id) {
    return Categories.find();
    // return (!id)
    //     ? Categories.find()
    //     : Categories.findOne(id);
});


Categories.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    },
    remove: function() {
        return true;
    }
})

/*
Categories:

Business
Equipment
Hay, Feed, & Shavings
Horse Shoes
Lessons & Shows
Property Maintenance
Tack & Supplies
Truck Expenses
Other
 */