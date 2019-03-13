const express = require('express');
const app = express();
var path = require('path');
const robot = require('./shared/route/robot');
const humain = require('./shared/route/humain');
const index = require('./shared/route/index');

//logger
var logger = require('morgan');
app.use(logger('dev'));

app.set('views', './views');
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    
	ua = req.headers['user-agent'];
	if( /firefox/i.test(ua) )
		browser = 'firefox';
	else if( /chrome/i.test(ua) )
		browser = 'chrome';
	else if( /safari/i.test(ua) )
		browser = 'safari';
	else if( /msie/i.test(ua) )
		browser = 'msie';
	else
		browser = 'unknown';

	console.log("browser", browser);
	console.log("req.url", req.url);
	if (req.originalUrl !== '/favicon.ico') {

		let matchRobot = req.url.match(/^\/(robot)/);
		let matchHumain = req.url.match(/^\/(humain)/);

		console.log("robot match", matchRobot);
		console.log("humain match", matchHumain);
		let newUri = req.url;
		console.log("newUri before", newUri) 

		if(browser === 'unknown'){
			if(matchHumain) newUri = newUri.replace("/humain", "");
			if(!matchRobot) newUri = "/robot" + newUri;
			console.log("newUri", newUri) 
			if(req.url != newUri){
				res.redirect(newUri);
			}else{
				next();
			}
	
		}else{
			if(matchRobot) newUri = newUri.replace("/robot", "");
			if(!matchHumain) newUri = "/humain" + newUri;
			console.log("newUri", newUri) 
			if(req.url != newUri) {
				res.redirect(newUri);
			}else{
				next();
			}
		}
	}else{
		console.log("call favicon")
		next();
	}
});

app.use("/robot", robot);
app.use("/humain", humain);
app.use(index);

//routes
app.get('*', (req, res) => {
	//res.sendFile(path.join(__dirname, '../public/index.html'));
	res.send('page not routing');
})
module.exports = app;

app.listen(3000);