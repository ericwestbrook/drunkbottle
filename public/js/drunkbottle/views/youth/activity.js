window.ActivityView = Backbone.View.extend({
	initialize: function(options) {
		this.options = options
		this.render();
	},

	render: function() {
		var data = { filename : this.options.filename };
		$(this.el).html(this.template(data));
		return this;
	}
});