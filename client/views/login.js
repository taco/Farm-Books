Template.login.events({
	'click button': function () {
		Meteor.loginWithGoogle();
	}
});

Template.login.rendered = function () {
	if (Meteor.user()) Router.go('/transactions');
}