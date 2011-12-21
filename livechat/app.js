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
    title: 'LivechatJS'
  }});
});

app.get('/chat', function(req, res){
  res.render('chatwindow', {locals: {
    title: 'LivechatJS'
  }});
});

app.get('/agent',function(req, res){
	res.render('agent', {locals: {
		title: 'LivechatJS - Agents'
	}});
})

app.listen(8000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var everyone = nowjs.initialize(app);
var admins = new Array();

everyone.now.clientlogin = function(email,name,dept){
	var group = nowjs.getGroup(name);
	this.now.groupname = name;
	this.now.name = name;
	this.now.email = email;
	this.now.dept = dept;
	group.addUser(this.user.clientId);
	console.log('Joined: ' + this.now.name);
	everyone.now.popGroups();
}
everyone.now.joinGroup = function(groupname){
	var group = nowjs.getGroup(groupname);
	console.log('admin joined group '+ groupname);
	group.addUser(this.user.clientId);
	group.now.receiveMessage(this.now.name, 'Admin has joined the chat',groupname);
	admins[admins.length] = this.user.clientId;
}

everyone.now.popGroups = function(){
	nowjs.getGroups(function(groups){
		var i = groups.length;
		for(i; i>0;--i){
			nowjs.getGroup(groups[i]).getUsers(function(users){
				var x = admins.length;
				for(x; x>0; --x){
					ind = users.indexOf(admins[x]);
					if(ind != -1){
						users.splice(ind,1);
					}
				}
				if(!users.length){
					groups.splice(i,1);
				}
				undef=groups.indexOf('undefined');
				if(undef != -1){
					groups.splice(undef,1);
				}
			})
		}
		everyone.now.setGroups(groups);
	});
}

nowjs.on('disconnect', function(){
			ind = admins.indexOf(this.user.clientId);
			if(ind != -1){			
				admins.splice(admins.ind,1);			
			}
})
nowjs.on('newgroup',function(group){
	  	console.log('You have successfully created the group `' + group.groupName + '`');
})
everyone.now.distributeMessage = function(message,groupname){
	group = nowjs.getGroup(groupname);
	group.now.receiveMessage(this.now.name, message, groupname);
}

//on admin connect add userID to array
//on list of groups
//remove users in admin array from lost of users in that group
//if the number of users in the group is 0, remove it from the list of groups.
//on admin disconnect, remove userid from admin array.