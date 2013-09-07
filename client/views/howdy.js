
Template.howdy.greeting = function () {
  return "Welcome to Farm-Books!!!";
};

Template.howdy.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
    $('body').html(Meteor.render(Template.hello));
  }
});
