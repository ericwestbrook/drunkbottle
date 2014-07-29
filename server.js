var express = require('express'),
	path = require('path'),
	http = require('http'),
	fs = require('fs'),
	hbs = require('hbs');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views'));


// ============================================
//
// Handlebars customization

hbs.registerPartials(__dirname + '/views/partials');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

// END Handlebars customization
//
// ============================================
//
// ROUTES

app.get("/", function(req, res) {
	res.render('index', {
		title: 'Choose your experience - Drunk Bottle'
	});
});

app.get("/adult", function(req, res) {
	res.render('adult', {
		title: 'Click to begin - Adults - Drunk Bottle'
	});
});

app.get("/youth", function(req, res) {
	res.render('youth', {
		title: 'Choose your gender to begin - Youths - Drunk Bottle'
	});
});

app.get("/youth/male", function(req, res) {
	res.render('youth', {
		title: 'Males - Youths - Drunk Bottle'
	});
});

app.get("/youth/female", function(req, res) {
	res.render('youth', {
		title: 'Females - Youths - Drunk Bottle'
	});
});

// END ROUTES
//
// ============================================



var port = process.env.PORT || 8080;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });