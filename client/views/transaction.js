
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
        var $item = $(e.currentTarget),
            record = Transactions.findOne($item.data('id'));

        Session.set('transaction', record);
        console.log('setting transaction', record);
        Controller.push(Template.transactionEditor, 250);

    },
    'touchend header, click header': function(e) {
        Controller.pop();
    },

    'touchstart [data-id]': function(e) {

    }
})


/* TRANSACTION EDITOR */

Template.transactionEditor.helpers({
    saveText: function () {
        return t.phantom() ? 'Create' : 'Update';
    },
    transaction: function () {
        return Session.get('transaction');
    },
    parseDate: function(d) {
        //var record = t.get();
        if (!d || !d.getMonth) d = new Date();
        return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    }
});

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
    },

    'touchend header, click header': function(e) {
        Controller.pop();
        console.log('ckic')
    }
});

