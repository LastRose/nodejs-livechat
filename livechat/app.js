/**

 * Module dependencies.

 */



var express = require('express')

  , routes = require('./routes')
  , nowjs = require('now');



var app = module.exports = express.createServer();


// Configuration



app.configure(function(){

  app.set('views', __dirname + '/views');

  app.set('view engine', 'jade');

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(app.router);

  app.use(express.static(__dirname + '/public'));

});



app.configure('development', function(){

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

});



app.configure('production', function(){

  app.use(express.errorHandler()); 

});



// Routes


app.get('/', function(req, res){
  res.render('index', {locals: {
    title: 'NowJS + Express Example'
  }});
});

app.get('/chat', function(req, res){
  res.render('chatwindow', {locals: {
    title: 'NowJS + Express Example'
  }});
});

app.get('/agent',function(req, res){
	res.render('agent', {locals: {
		title: 'Agent Screen'
	}})
})

app.listen(8000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var everyone = nowjs.initialize(app);
var d = new Date();
nowjs.on('connect', function(){
			var group = nowjs.getGroup(this.now.name + d);
			group.addUser(this.user.clientId);
      console.log("Joined: " + this.now.name);
      group.now.distributeMessage = function(message){
			  group.now.receiveMessage(this.now.name, message);
			};
});

nowjs.on('newgroup',function(group){
	  	console.log('You have successfully created the group `' + group.groupName + '`');
})

everyone.now.joinGroup = function(groupname){
	var group = nowjs.getGroup(groupname);
	group.addUser(this.user.clientId);
	group.now.distributeMessage('Admin has joined the chat');
	everyone.now.findGroups();
}

everyone.now.findGroups = function(){
	everyone.now.setGroups(nowjs.getGroups());
}