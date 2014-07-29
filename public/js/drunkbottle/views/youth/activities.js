window.ActivitiesView = Backbone.View.extend({
	initialize: function(options) {
		this.options = options
		this.render();
	},

	render: function() {
		var data = { gender : this.options.gender };
		$(this.el).html(this.template(data));
		return this;
	}
});