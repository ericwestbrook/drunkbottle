window.SplashView = Backbone.View.extend({
	initialize: function(options) {
		this.options = options
		this.render();
	},

	render: function() {
		var data = { counter : this.options.counter };
		$(this.el).html(this.template(data));
		return this;
	}
});