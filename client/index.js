Subscriptions = {
  transactions: Meteor.subscribe('transactions')
};

// Router.configure({
//   layout: 'viewport',
//   notFoundTemplate: 'notFound',
//   loadingTemplate: 'loading'
// });

// Router.map(function () {
  
//   this.route('login', {
//     path: '/'
//   });

//   this.route('transactions', {
//     path: '/transactions',
//     controller: 'TransactionsController',
//     action: 'show'
//   });

//   this.route('createTransaction', {
//     path: '/transactions/create',
//     controller: 'TransactionsController',
//     action: 'create'
//   });

//   this.route('transactionEditor', {
//     path: '/transactions/edit/:_id',
//     controller: 'TransactionsController',
//     action: 'edit'
//   });
// });


Template.home1.events({
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

Template.viewport.events({
  'touchstart [data-action="menu"], click [data-action="menu"]': function() {
    $('#menu').css('z-index', 12);
  },
  'swiperight #viewport': function() {
      console.log('shit shit shit');
  }
});

Template.viewport.rendered = function() {
  Hammer($('#viewport')).on('swiperight', function() {
    //history.back();
    //things
  })

  console.log('vp rendered');

  Meteor.render(Template.test({name: 'Taco'}));
}

/* TRANSACTIONS CONTROLLER */

// TransactionsController = RouteController.extend({
//   template: 'transactions',

//   waitOn: Subscriptions['transactions'],

//   data: function () {
//     return { transactions: Transactions.find() };
//   },

//   show: function () {
//     this.render('transactions');
//     this.render('transactionsHeader', {to: 'header'});
//     this.render('transactionsFooter', {to: 'footer'});
//   },

//   create: function () {
    
//     var t = new Transaction(),
//       record = t.insert();

//     t.date = new Date();

//     //Session.set('transactionsId', record._id);
//     //Session.set('transactionsRecord', record);
//     this.render('transactionEditor', {data: record});
//     this.render('transactionEditorHeader', {to: 'header'});
//   },

//   edit: function () {
//     var record = Transactions.findOne(this.params._id);
// //    console.log('_id', this.params._id, record);

//     //Session.set('transactionsId', this.params._id);
//     //Session.set('transactionsRecord', record);
//     this.render('transactionEditor', {data: record});
//     this.render('transactionEditorHeader', {to: 'header'});
//   }

// });

Meteor.methods({
  things: function (url) {
//    console.log('THINGS URL', url);
  }
})

$(document).ready(function () {
  //console.log($('#file_upload'));

})