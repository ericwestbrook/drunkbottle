window.Video = Backbone.Model.extend({
	playVideo: function() {
		this.set({play: true});
	},

	defaults: {
		name: "",
		play: false,
	}
});

window.VideoList = Backbone.Collection.extend({
	model: Video
});