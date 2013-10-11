Subscriptions = {
  transactions: Meteor.subscribe('transactions')
};

Router.configure({
  layout: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function () {
  
  this.route('home', {
    path: '/'
  });

  this.route('transactions', {
    path: '/transactions',
    controller: 'TransactionsController',
    action: 'show'
  });

  this.route('createTransaction', {
    path: '/transactions/create',
    controller: 'TransactionsController',
    action: 'create'
  });

  this.route('transactionEditor', {
    path: '/transactions/edit/:_id',
    controller: 'TransactionsController',
    action: 'edit'
  });
});


Template.home.events({
  'click #sign': function () {
    var policy = $('#policy').val();
    Meteor.call('sign', policy, function (e, result) {
      $('[name="policy"]').val(result.policy);
      $('[name="signature"]').val(result.signature);
    });
  },
  'click #upload': function () {
    $.ajax({
      url: 'https://fhfarm-books.s3.amazonaws.com',
      type: 'POST',
      data: new FormData($('form')[0]),
      processData: false,
      contentType: false,
      cache: false,
      success: function () {
        alert('success!!!');
      }
    });
  }
});

/* TRANSACTIONS CONTROLLER */

TransactionsController = RouteController.extend({
  template: 'transactions',

  waitOn: Subscriptions['transactions'],

  data: function () {
    return { transactions: Transactions.find() };
  },

  show: function () {
    this.render('transactions');
  },

  create: function () {
    Session.set('transactionsId', null);
    Session.set('transactionsRecord', null);
    this.render('transactionEditor');
  },

  edit: function () {
    var record = Transactions.findOne(this.params._id);
    console.log('_id', this.params._id, record);

    Session.set('transactionsId', this.params._id);
    Session.set('transactionsRecord', record);
    this.render('transactionEditor');
  }

});

Meteor.methods({
  things: function (url) {
    console.log('THINGS URL', url);
  }
})

$(document).ready(function () {
  console.log($('#file_upload'));

})