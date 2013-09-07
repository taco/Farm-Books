
Template.hello.greeting = function () {
  return "Welcome to Farm-Books.";
};

Template.hello.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");

    $('body').html(Meteor.render(Template.howdy));
  }
});
