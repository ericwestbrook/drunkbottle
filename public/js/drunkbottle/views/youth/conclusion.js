window.ConclusionView = Backbone.View.extend({
	initialize: function(options) {
		this.options = options
		this.render();
	},

	render: function() {
		var data = { randoVideo : this.options.randoVideo };
		$(this.el).html(this.template(data));
		return this;
	}
});