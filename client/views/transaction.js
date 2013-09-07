/* TRANSACTIONS */

// var Transaction = {
//     record: null,

//     load: function (transactionId) {
//         if (!transactionId) transactionId = Session.get('transactionId');
//         else Session.get('transactionId', transactionId);

//         Transaction.record = Transactions.findOne({_id: transactionId});
        
//         return Transaction.record;
//     },

//     insert: function (data) {
//         if (!data) data = {};
        
//         data.date = new Date();

//         Session.set('transactionId', Transactions.insert(data));

//         return Transaction.load();
//     },

//     isCreate: function () {
//         return !Session.get('transactionId');
//     }
// };

var t = new Model('Transactions');

Template.transactions.events({
    // 'click button[data-action="add-transaction"]': function () {
    //     debugger;
    //     Session.set('transactionId', null);
    //     ViewManager.loadTemplate('transactionEditor');
    // }
});


/* TRANSACTION GRID */

Template.transactionGrid.transactions = function () {
    return Transactions.find();
};


/* TRANSACTION EDITOR */

Template.transactionEditor.helpers({
    saveText: function () {
        return t.phantom() ? 'Create' : 'Update';
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



window.TransactionsController = RouteController.extend({
  template: 'transactions',

  waitOn: Subscriptions['transactions'],

  data: function () {
    return { transactions: Transactions.find() };
  },

  show: function () {
    this.render('transactions');
  },

  create: function () {
    Session.set('transactionId', null);
    this.render('transactionEditor');
  }

})