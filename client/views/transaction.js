
/**
 * Transaction Definition
 * - _id            (string)
 * - _entryDate     (date)
 * - _user          (string)
 * - id             (number)
 * - vendor         (string)
 * - amount         (number)
 * - date           (date)
 * - category       (string)
 * - description    (string)
 * - horses         (string[])
 * - receipts       (object[])
 */


var t = new Transaction();

/* TRANSACTION GRID */

Template.transactions.transactions = function () {
    return Transactions.find();
};

Template.transactions.events({
    'touchend [data-id], click [data-id]': function(e) {
        var id = $(e.currentTarget).data('id');
        Router.go('/transactions/edit/' + id);
    }
})

Template.transactionsHeader.events({
    'touchend [data-action="create"], click [data-action="create"]': function () {
        Router.go('/transactions/create');
    }
});


/* TRANSACTION EDITOR */

Template.transactionEditor.helpers({
    saveText: function () {
        return t.phantom() ? 'Create' : 'Update';
    },
    transaction: function () {
        return t.get();
    },
    parseDate: function(d) {
        //var record = t.get();
        if (!d || !d.getMonth) d = new Date();
        return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    }
});

Template.transactionEditorHeader.helpers({
    transaction: function () {
        return t.get();
    }
});

Template.transactionEditorHeader.events({
    'touchstart [data-action="save"], click [data-action="save"]': function() {
        var id = t.record._id;

        $('[data-bind]').each(function () {
            var $this = $(this);
            t.set($this.attr('data-bind'), $this.val());
        });

        t.save();
        t.cleanup();

        t = new Transaction();

        Router.go('transactions');
    }
})

Template.transactionEditor.events({
    
    'click [data-action="save"]': function (e) {
        var id = t.record._id;

        $('[data-bind]').each(function () {
            var $this = $(this);
            t.set($this.attr('data-bind'), $this.val());
        });

        t.save();
        t.cleanup();

        t = new Transaction();

        Router.go('transactions');
    }
});

