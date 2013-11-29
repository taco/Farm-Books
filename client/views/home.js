Template.home.events({
	'click header, touchend header': function() {
		// var element = Meteor.render(Template.transactions);
		
		// document.body.appendChild(element);

		Controller.push(Template.transactions);
	},

	'click article, touchend article': function() {
		//$('.loading').addClass('active');
	},

    'swiperight #viewport': function() {
        console.log('swiperight');
    },

    'tap article': function() {
        console.log('tap article')
    },

    'swiperight article': function() {
        console.log('swiperight')
    }
});