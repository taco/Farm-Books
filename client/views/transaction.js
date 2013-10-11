



var t = new Model('Transactions');

Template.transactions.events({
    'click button[data-action="add-transaction"]': function () {
        Router.go('')
    }
});


/* TRANSACTION GRID */

Template.transactionGrid.transactions = function () {
    return Transactions.find();
};


/* TRANSACTION EDITOR */

Template.transactionEditor.helpers({
    saveText: function () {
        return t.phantom() ? 'Create' : 'Update';
    },
    transaction: function () {
        return t.record;
    }
});

Template.transactionEditor.created = function () {
//    t = new Model(Transactions);
    t.init();
};

Template.transactionEditor.events({
    
    'click [data-action="save"]': function (e) {
        var id = t.record._id;

        $('[data-bind]').each(function () {
            var $this = $(this);
            t.set($this.attr('data-bind'), $this.val());
        });

        t.save();
        t.cleanup();

        t = new Model('Transactions');

        Router.go('transactions');
    }
});

