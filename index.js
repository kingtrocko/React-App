require('newrelic');
// New Relic needs to be first line

var express = require('express');
var pastebin = require('pastebin-js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var aws = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
var app = express();


// setup the app
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/dist'));

// Amazon S3 Configuration
var AWS_ACCESS_KEY = 'AKIfgf54646POYQ';
var AWS_SECRET_KEY = 'RV5R546fgfdz4M';
var AWS_REGION = 'us-west-2';
var S3_BUCKET = 'beindata';

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'https://beindata.s3.amazonaws.com');
  res.setHeader('Access-Control-Allow-Origin', 'http://www.dailymotion.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//connect to mongoose
//mongoose.connect('mongodb://localhost:27017/test');
if (process.env.MONGO_URI != null) {
	//mongoose connection for production or staging server
	mongoose.connect(process.env.MONGO_URI);
} else {
	//mongoose connection to staging in case of local
	mongoose.connect('mongodb://user:somepass@ds043002.mongolab.com:43002/staging-bein');
}

//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function (filename) {
	if (~filename.indexOf('.js')) {
		require(__dirname + '/models/' + filename);
		console.log(filename + ' model loaded');
	}
}); 

app.get('/sign_s3', function(req, res){
	var filename = uuid.v4() + "_" + req.query.file_name.trim();
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: filename, 
        Expires: 60, 
        ContentType: req.query.file_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+filename 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
});


//Document = React.createFactory(require("./app/server_side_app.jsx"));

//TO RENDER REACT COMPONENTS FROM SERVER SIDE

// app.get("/", function (req, res) {

//   console.log("ENTRO EN EL GET");
//    Router.run(routes, req.path, function (Handler) {
//     //var content = "<html><head></head><body><div>hola</div></body</html>";
//     var content = React.renderToString(React.createElement(Handler));
//     console.log("SI ENTRO");
//    	// console.log("=================================================");
//     // console.log("content is " + content);
//     // console.log("=================================================");
//     // console.log("la ruta es: " + req.url);
//     res.send('<!DOCTYPE html>' + content);
//    });
// });

//load the routes
require('./routes.js')(app);




//app.use('/users', users);

// app.get('/test', function (request, response) {
// 	response.render('test');
// });

// app.get('/', function(request, response) {

//   		pastebinID = 'bWwKvmUm';

// 		var paste = new pastebin({
// 	      'api_dev_key' : '5def9d8a7c94ef14c913587968364f06'
// 	    });

// 		paste.getPaste(pastebinID).then(function (data) {
// 			response.send(data);
// 		}).fail(function (err) {
// 		    // Something went wrong
// 		    response.send('Error: ' + err);
// 		  });
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
