// CONFIGURATION
var dbActivities = {
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
};
// END CONFIGURATION

var AppRouter = Backbone.Router.extend({
	routes: {
		""							: "home",
		"male"						: "male",
		"female"					: "female", 
		"activities/:activity"		: "activity",  
	},

	initialize: function() {
		this.homeView = new HomeView();
		$('#video_box').html(this.homeView.el);

		this.splashView = new SplashView();
		$('#splash').html(this.splashView.el);

		$('#next_button').click(function() {
			$('#splash').removeClass('on');
		});

		this.loopTimer = setInterval(function() {
			var rando = Math.floor((Math.random() * 6) + 1);
			$('#video_box video.on').removeClass('on');
			$('#video_box video#idle_0' + rando).addClass('on');
			$('#video_box video.on').get(0).play();
		}, 20000);
		$('#video_box video.on').get(0).play();
	},

	home: function(id) {
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

	male: function(id) {
		this.gender = 'male';
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
		$("#video_box video.on").unbind().bind("ended", function() {
			$('#activity_buttons').removeClass('disabled');
			$('#arrow_right').removeClass('disabled');
		});
		$('#video_box video.on').get(0).play();

		this.timeoutInterval = setTimeout(function() {
			// write timeout function and copy to all but home
		}, 45000);

		var pageNumber = 1;
		$('#arrow_left').click(function() {
			if (pageNumber != 1) {
				$('#page_wrapper').removeClass('page_' + pageNumber);
				pageNumber--;
				$('#page_wrapper').addClass('page_' + pageNumber);
				if (pageNumber == 1) {
					$('#arrow_left').addClass('disabled');
				}
				$('#arrow_right').removeClass('disabled');
			}
		});

		$('#arrow_right').click(function() {
			if (pageNumber != 4) {
				$('#page_wrapper').removeClass('page_' + pageNumber);
				pageNumber++;
				$('#page_wrapper').addClass('page_' + pageNumber);
				if (pageNumber == 4) {
					$('#arrow_right').addClass('disabled');
				}
				$('#arrow_left').removeClass('disabled');
			}
		});
	},

	female: function(id) {
		this.gender = 'female';
		clearInterval(this.loopTimer);
		if (!this.femaleView) {
			this.femaleView = new ActivitiesView({gender : 'female'});
		}
		$('#video_box').html(this.femaleView.el);

		if (!this.controlsView) {
			this.controlsView = new ControlsView();
		}

		$('#controls').html(this.controlsView.el);
		$('#video_box video.on').get(0).play();

		$('#controls').html(this.controlsView.el);
		setTimeout(function() {
			$('#activity_buttons').removeClass('preload');
		}, 1000);
		$("#video_box video.on").unbind().bind("ended", function() {
			$('#activity_buttons').removeClass('disabled');
			$('#arrow_right').removeClass('disabled');
		});
		$('#video_box video.on').get(0).play();

		this.timeoutInterval = setTimeout(function() {
			// write timeout function and copy to all but home
		}, 45000);

		var pageNumber = 1;
		$('#arrow_left').click(function() {
			if (pageNumber != 1) {
				$('#page_wrapper').removeClass('page_' + pageNumber);
				pageNumber--;
				$('#page_wrapper').addClass('page_' + pageNumber);
				if (pageNumber == 1) {
					$('#arrow_left').addClass('disabled');
				}
				$('#arrow_right').removeClass('disabled');
			}
		});

		$('#arrow_right').click(function() {
			if (pageNumber != 4) {
				$('#page_wrapper').removeClass('page_' + pageNumber);
				pageNumber++;
				$('#page_wrapper').addClass('page_' + pageNumber);
				if (pageNumber == 4) {
					$('#arrow_right').addClass('disabled');
				}
				$('#arrow_left').removeClass('disabled');
			}
		});
	},

	activity: function(activity) {
		if (!this.gender) {
			this.gender = 'female';
		}
		var gender = this.gender;

		$('#splash').removeClass('on');

		clearInterval(this.loopTimer);

		if (!this.activityViewCount) {
			this.activityViewCount = 1;
		} else {
			this.activityViewCount++;
		}

		if (!this.controlsView) {
			this.controlsView = new ControlsView();
			$('#controls').html(this.controlsView.el);
			setTimeout(function() {
				$('#activity_buttons').removeClass('preload');
			}, 1000);
		}

		$('#controls').addClass('disabled');

		var videoCount = dbActivities[activity];
		var activityFile = '';
		if (videoCount > 1) {
			var randoVideo = Math.floor((Math.random() * videoCount) + 1);
			activityFile = activity + '_0' + randoVideo;
		} else {
			activityFile = activity;
		}
		this.activityView = new ActivityView({
			filename: activityFile,
		});

		$('#video_box').html(this.activityView.el);







		if (this.activityViewCount != 4) {
			var activityViewCount = this.activityViewCount;
			$("#video_box video.on").unbind().bind("ended", function() {
				$('#activity_buttons').removeClass('disabled');
				$('#arrow_right').removeClass('disabled');
				$('.fact_wrap').removeClass('on');
				$('#youth_fact_wrap_0' + activityViewCount).addClass('on');
				$('.fact_wrap.on video').get(0).play();
				$('#splash').addClass('on');
				$('#controls').removeClass('disabled');
			});
		} else {
			var activityViewCount = this.activityViewCount;
			$("#video_box video.on").unbind().bind("ended", function() {
				$('#activity_buttons').removeClass('disabled');
				$('#arrow_right').removeClass('disabled');

				$('#splash').addClass('on');
			});
		}






		$('#video_box video.on').get(0).play();


		var pageNumber = 1;
		$('#arrow_left').click(function() {
			if (pageNumber != 1) {
				$('#page_wrapper').removeClass('page_' + pageNumber);
				pageNumber--;
				$('#page_wrapper').addClass('page_' + pageNumber);
				if (pageNumber == 1) {
					$('#arrow_left').addClass('disabled');
				}
				$('#arrow_right').removeClass('disabled');
			}
		});

		$('#arrow_right').click(function() {
			if (pageNumber != 4) {
				$('#page_wrapper').removeClass('page_' + pageNumber);
				pageNumber++;
				$('#page_wrapper').addClass('page_' + pageNumber);
				if (pageNumber == 4) {
					$('#arrow_right').addClass('disabled');
				}
				$('#arrow_left').removeClass('disabled');
			}
		});
	}
});

templates = [
	'HomeView',
	'ActivitiesView',
	'ActivityView',
	'ControlsView',
	'SplashView'
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