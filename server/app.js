const express = require('express');
const app = express();
var path = require('path');
var https = require('https');

const port = process.env.PORT || 80;
const useSsl = process.env.USE_SLL || false;

const robot = require('./shared/route/robot');
const humain = require('./shared/route/humain');
const index = require('./shared/route/index');

//logger
var logger = require('morgan');
app.use(logger('dev'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname + 'uploads')));

app.use(function(req, res, next){
	return  req.headers['user-agent'].match(/firefox|chrome|safari|msie/i)  ? humain(req, res, next) : robot(req, res, next);
});

//app.use("/robot", robot);
//app.use("/humain", humain);
//app.use(index);

//routes
app.get('*', (req, res) => {
	//res.sendFile(path.join(__dirname, '../public/index.html'));
	res.send('page not routing');
})
module.exports = app;

if(useSsl){
	/*const options = {
		key: fs.readFileSync('../../ssl-keys/key.pem'),
		cert: fs.readFileSync('../../ssl-keys/key.pem')
	  }
	const server = https.createServer(options, app).listen(443);*/
}else{
	app.listen(port, function(){
		console.log("ssr-log listen on port: " + port)
	});
}
