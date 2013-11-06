Controller = {
	_tpls: [],
	_delay: 450,

	push: function (tpl, timeout) {
		var frag,
			showLoader;

		showLoader = setTimeout(function () {
			$('.loading').addClass('active');
		}, 300);

		setTimeout(function () {
			frag = Meteor.render(tpl);

			$('body').append(frag);

			setTimeout(function () {			
				clearTimeout(showLoader);
				$('.loading').removeClass('active');

				$('.viewport.active')
					.removeClass('active');

				$('.viewport.spawn')
					.addClass('active')
					.removeClass('spawn')	
			}, timeout || 1);
		}, 1)

		//c._tpls.push(tpl);

		

	},
	pop: function () {
		var $views = $('.viewport:not(.active)'),
			$pop = $('.viewport.active');

		$views.last()
			.addClass('active');

		$pop
			.addClass('spawn')
			.removeClass('active');

		setTimeout(function() {
			$pop.remove();
		}, c._delay);

	},

	load: function (tpl) {
	}
};

var c = Controller;