var express = require('express'),
    events = require('./routes/events');
 
var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});
 
app.get('/events/topprograms/:id', events.findTopPrograms);
app.get('/events/findActiveVisitors/:id', events.findActiveVisitors);
app.get('/events/populateUser/:id/:name', events.populateUser);
app.get('/events/populateUsers/:id', events.populateUsers);
app.get('/events', events.findAll);
app.get('/events/:id', events.findById);
app.post('/events', events.addEvent);
app.put('/events/:id', events.updateEvent);
app.delete('/events/:id', events.deleteEvent);
 
app.listen(3000);
console.log('Listening on port 3000...');