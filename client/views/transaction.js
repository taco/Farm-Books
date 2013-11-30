
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
    lastTouchevent = new Date(),
    dragging = false,
    draggedX = 0,
    original3d;

/* TRANSACTION GRID */

Template.transactions.transactions = function () {
    return Transactions.find({archived: {$ne: true}}, {sort: {date: -1}});
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
        if (dragging) e.preventDefault();
        touchmove = e;
        move = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
    },
    'touchmove [data-id]': function(e) {
        var delta;

        if (!dragging) {
            dragging = Math.abs(start.y - move.y) < 10 && Math.abs(start.x - move.x) > 20;
            if (!dragging) return;
        }

        //e.preventDefault();
        //e.stopPropogation();

        if (!original3d) {
            original3d = getTransform(e.currentTarget);
        }

        draggedX = original3d[0] + move.x - start.x;

        if (draggedX > 0)
            draggedX = 0;

        if (draggedX < -180)
            draggedX = (draggedX + 180) / 2 - 180;

        $(e.currentTarget).css('-webkit-transform', 'translate3d(' + draggedX + 'px,0,0)');

    },
    'touchend .transaction, click .Transaction': function(e) {
        var $item = $(e.currentTarget),
            record = Transactions.findOne($item.data('id'));

        original3d = null;
        dragging = false;

        e.preventDefault();
        if (checkTouchend(e)) {

            $('.transaction.active').removeClass('active');

            if (draggedX < -100)
                $item.addClass('active')
            else
                $item.removeClass('active');

            $item.css('-webkit-transform', '');
            draggedX = 0;
            return;
        }
        if ($item.hasClass('active')) {
            $item.removeClass('active');
            return;
        }
        

        Session.set('transaction', record);
        Controller.push(Template.transactionEditor);
    },
    'touchend .archive, click .archive': function(e) {
        
        if (checkTouchend(e)) return;
        e.preventDefault();
        

        var $item = $(e.currentTarget),
            record = Transactions.findOne($item.data('id'));

        t.loadRecord(record);
        t.archive();
    },
    'touchend nav, click nav': function(e) {
        if (checkTouchend(e)) return;
        e.preventDefault();
        Controller.pop();
    },
    'touchend aside, click aside': function(e) {
        if (checkTouchend(e)) return;
        e.preventDefault();

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

Template.transactions.helpers({
    formatCurrency1: function(value) {
        var ret,
            split;

        if (!value || isNaN(value)) return '$ 0.00';

        ret = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        split = ret.split('.');

        if (split.length < 2)
            ret += '.00';
        else {
            switch (split[1].length) {
                case 0:
                    ret += '00';
                    break;
                case 1:
                    ret += '0'
                    break;
            }
        }

        ret = '$ ' + ret;

        return ret;
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

        e.preventDefault();
        
        //if (checkEventBuffer()) return;

        console.log('attempt save');

        t.loadRecord(Session.get('transaction'));

        $('[data-bind]').each(function () {
            var $this = $(this);
            t.set($this.attr('data-bind'), $this.val());
        });

        t.save();
        Controller.pop();
    },

    'touchend nav, click nav': function(e) {
        e.preventDefault();
        Controller.pop();
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

function getTransform(el) {
    var results = $(el).css('-webkit-transform').match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)

    if(!results) return [0, 0, 0];
    if(results[1] == '3d') return results.slice(2,5);

    results.push(0);
    return results.slice(5, 8);
}

