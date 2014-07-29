// CONFIGURATION
var drunkBottleConfig = {
	activities : {
		//name					: //video count
		"baseball"				: 2,
		"basketball"			: 2,
		"biking"				: 2,
		"chainsaw"				: 2,
		"cheerleading"			: 1,
		"cooking"				: 1,
		"fishing"				: 1,
		"football"				: 2,
		"gymnastics"			: 1,
		"hiking"				: 1,
		"hiphop"				: 1,
		"horsebackriding"		: 1,
		"hunting"				: 1,
		"knitting"				: 2,
		"library"				: 2,
		"music"					: 2,
		"photo"					: 1,
		"rodeo"					: 1,
		"sewing"				: 1,
		"skateboarding"			: 2,
		"soccer"				: 1,
		"squaredancing"			: 1,
		"swim"					: 1,
		"tennis"				: 1,
		"volleyball"			: 1
	}
};
// END CONFIGURATION

var AppRouter = Backbone.Router.extend({
	routes: {
		""					: "home",
		"male"				: "male",
		"female"			: "female", 
		"activity"			: "activity",
		"splash"			: "splash",
		"conclude"			: "conclude",   
	},

	initialize: function() {
		this.homeView = new HomeView();
		$('#video_box').html(this.homeView.el);

		this.loopTimer = setInterval(function() {
			var rando = Math.floor((Math.random() * 6) + 1);
			$('#video_box video.on').removeClass('on');
			$('#video_box video#idle_0' + rando).addClass('on');
			$('#video_box video.on').get(0).play();
		}, 20000);
		$('#video_box video.on').get(0).play();
	},

	home:function(id) {
		clearInterval(this.loopTimer);
		$('#controls').html('');
		if (!this.homeView) {
			this.homeView = new HomeView();
		}
		$('#video_box').html(this.homeView.el);

		this.loopTimer = setInterval(function() {
			var rando = Math.floor((Math.random() * 6) + 1);
			$('#video_box video.on').removeClass('on');
			$('#video_box video#idle_0' + rando).addClass('on');
			$('#video_box video.on').get(0).play();
		}, 20000);
		$('#video_box video.on').get(0).play();
	},

	male:function(id) {
		clearInterval(this.loopTimer);
		if (!this.maleView) {
			this.maleView = new ActivitiesView({gender : 'male'});
		}
		$('#video_box').html(this.maleView.el);

		if (!this.controlsView) {
			this.controlsView = new ControlsView();
		}

		$('#controls').html(this.controlsView.el);
		$('#video_box video.on').get(0).play();

		$('#controls').html(this.controlsView.el);
		setTimeout(function() {
			$('#activity_buttons').removeClass('preload');
		}, 1000);
		setTimeout(function() {
			$('#activity_buttons').removeClass('disabled')
		}, 12000);
		$('#video_box video.on').get(0).play();

		this.timeoutInterval = setTimeout(function() {
			// write timeout function and copy to all but home
		}, 45000);
	},

	female:function(id) {
		clearInterval(this.loopTimer);
		if (!this.femaleView) {
			this.femaleView = new ActivitiesView({gender : 'female'});
		}
		$('#video_box').html(this.femaleView.el);

		if (!this.controlsView) {
			this.controlsView = new ControlsView();
		}

		$('#controls').html(this.controlsView.el);
		$('#activity_buttons').removeClass('preload');
		setTimeout(function() {
			$('#activity_buttons').removeClass('disabled')
		}, 1200);
		$('#video_box video.on').get(0).play();
	}
});

templates = [
	'HomeView',
	'ActivitiesView',
	'ControlsView'
];

utils.loadTemplate(templates, 'youth', function() {
	app = new AppRouter();
	Backbone.history.start({
		pushState: true,
		root: "/youth/"
	});

	// Prevent page refreshes on pushState pages
	$(document).on('click', 'a:not([data-bypass])', function (evt) {
	    var href = $(this).attr('href');
	    var protocol = this.protocol + '//';
	    if (href.slice(protocol.length) !== protocol) {
	    	evt.preventDefault();
	    	app.navigate(href, true);
    	}
    });
});