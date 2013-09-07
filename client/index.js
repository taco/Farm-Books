
// Template.hello.greeting = function () {
//   return "Welcome to Farm-Books.";
// };

// Template.hello.transactions = function () {
//   return Transactions.find({});
// };

// Template.hello.events({
//   'click input' : function () {
//     // template data, if any, is available in 'this'
//     if (typeof console !== 'undefined')
//       console.log("You pressed the button");

//     Transactions.insert({text: prompt('Text?')});

//     //$('body').html(Meteor.render(Template.howdy));
//   }
// });


ViewManager = {
  loadTemplate: function (template) {
    var html;

    if (typeof template === 'string') template = Template[template];

    if (!template) throw 'Could not loadTemplate';

    html = Meteor.render(template);

    $('.content').html(html);
  }
};

Router.configure({
  layout: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Subscriptions = {
  items: Meteor.subscribe('transactions')
};

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
});

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
    Session.set('transactionId', null);
    this.render('transactionEditor');
  }

})