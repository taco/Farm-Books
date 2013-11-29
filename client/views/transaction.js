
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
var touchstart,
    touchmove,
    start,
    move,
    lastTouchevent = new Date();

/* TRANSACTION GRID */

Template.transactions.transactions = function () {
    return Transactions.find();
};

Template.transactions.events({
    'touchstart': function(e) {
        touchstart = e;
        console.log('start', e.touches[0].clientY)
        start = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        move = {
            x: start.x,
            y: start.y
        }
    },
    'touchmove': function(e) {
        touchmove = e;
        console.log('stop', e.touches[0].clientY)
        move = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
    },
    'touchend [data-id], click [data-id]': function(e) {
        if (checkTouchend(e)) return;
        var $item = $(e.currentTarget),
            record = Transactions.findOne($item.data('id'));

        Session.set('transaction', record);
        Controller.push(Template.transactionEditor, 250);
    },
    'touchend nav, click nav': function(e) {
        if (checkTouchend(e)) return;
        Controller.pop();
    },
    'touchend aside, click aside': function(e) {
        if (checkTouchend(e)) return;
        var t = new Transaction(),
            r = t.insert();

        t.saveId();
        Session.set('transaction', r);
        Controller.push(Template.transactionEditor, 250);
    },
    'tacotest nav': function(e) {
        console.log('tacotest', e)
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
    parseDate: function (d) {
        if (!d || !d.getMonth) d = new Date();
        return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    }
})

Template.transactionEditor.events({
    
    'touchend aside, click aside': function (e) {
        var id;
        
        if (checkEventBuffer()) return;

        console.log('attempt save');

        t.loadRecord(Session.get('transaction'));

        $('[data-bind]').each(function () {
            var $this = $(this);
            t.set($this.attr('data-bind'), $this.val());
        });

        t.save();
        Controller.pop(250);
    },

    'touchend nav, click nav': function(e) {
        Controller.pop(250);
    }
});

var checkTouchend = function(e) {
    if (!touchstart) return false;
    return Math.abs(move.y - start.y) > 10 || Math.abs(move.x - start.x) > 10;
}

var checkEventBuffer = function() {
    var d = new Date(),
        delta = d.getTime() - lastTouchevent.getTime();

    if (delta < 750) return true;

    lastTouchevent = d;
    return false;
}

