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
	},

	idleVideoCount : 6
};
// END CONFIGURATION

var AppRouter = Backbone.Router.extend({
	routes: {
		""					: "home",
		"activities"		: "activities",
		"activity"			: "activity",
		"splash"			: "splash",
		"conclude"			: "conclude",   
	},

	initialize: function() {
		this.homeView = new HomeView();
		$('#video_box').html(this.homeView.el);

		setInterval(function() {
			var rando = Math.floor((Math.random() * 6) + 1);
			$('#video_box video.on').removeClass('on');
			$('#video_box video#idle_0' + rando).addClass('on');
			$('#video_box video.on').get(0).play();
		}, 20000);
	},

	home:function(id) {
		if (!this.homeView) {
			this.homeView = new HomeView();
		}
		$('#video_box').html(this.homeView.el);
	}
});

templates = [
	'HomeView',
	'VideoView'
];

utils.loadTemplate(templates, 'youth', function() {
	app = new AppRouter();
	Backbone.history.start({ pushState: true });

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