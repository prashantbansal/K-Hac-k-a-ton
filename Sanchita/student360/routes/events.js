var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('eventdb', server);


db.open(function(err, db) {
    if(!err) {
	console.log("Connected to 'eventdb' database");
	db.collection('events', {strict:true}, function(err, collection) {
	   if (err) {
		console.log("The 'events' collection doesn't exist. Creating it with sample data...");
                populateDB();
	   }
	});
    }
});

function GetTimeToSubtract(id)
{
    var timeToSubtract = 0;	
    switch(id)
    {
	case '1':	
		timeToSubtract = 60*5*1000;
		break;
	case '2':
		timeToSubtract = 60*60*24*1000;
		break;
	case '3':
		timeToSubtract = 60*60*24*1000*7;
		break;		
    }
    return timeToSubtract;
}

function random(max)
{
    return Math.floor(Math.random() * max) + 1;
}

exports.populateUsers = function(req, res) {    
    var programs = [ "GRE", "GMAT" ];   
    
    for (i = 0; i <= 100; i++)
    {
        var program = programs[random(programs.length) - 1];
        if(program == "GRE")
        {
            populateGRE(i,"User"+i);
        }
        else
        {
            populateGMAT(i,"User"+i);
        }
    }

};

exports.populateUser = function(req, res) {
    console.log('Populate User' + req.params.id + req.params.name);
    populateGMAT(parseInt(req.params.id), req.params.name);
};

exports.findActiveVisitors = function(req, res) {
    console.log('Find active visitors');
    var id = req.params.id;   
    var timeToSubtract = GetTimeToSubtract(id);
    console.log('Time to subtract' + timeToSubtract);

    db.collection('events', function(err, collection) {
        collection.distinct('userId', {'time':{$gte: new Date(Date.now() - timeToSubtract)}},function(err, item) {
            	console.log('count' + item.length);
		res.send(item);
        });
    });        
};


exports.findTopPrograms = function(req, res) {
    console.log('Finding top programs');
    var id = req.params.id;   
    var timeToSubtract = GetTimeToSubtract(id);
    console.log('Time to subtract' + timeToSubtract);

    db.collection('events', function(err, collection) {
  	collection.aggregate([
		{
		 $match: {
                  'time': {
                     $gte: new Date(Date.now() - timeToSubtract) 
                    }
		}
		},		
		{$group : { 
			'_id' : '$program', 
			'number' : {$sum : 1}
		}},		
		{$limit : 5}				
		], function(err, item) {
            res.send(item)
		});
        });
};

exports.findById = function(req, res) {
    var id = req.params.id;   
    console.log('Retrieving event: ' + id);
    db.collection('events', function(err, collection) {
        collection.find({ $query:{'userId':parseInt(id)}, $orderby: {'time': -1}}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addEvent = function(req, res) {
    var event = req.body;
    console.log('Adding event: ' + JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.insert(event, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateEvent = function(req, res) {
    var id = req.params.id;
    var event = req.body;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(event);
            }
        });
    });
}

exports.deleteEvent = function(req, res) {
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    db.collection('events', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}



var populateGRE = function(userId, userName) {
   var events = [
    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "started",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : null,
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "viewed",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Orientation Video",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "downloaded",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "Getting Started Guide (PDF)",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "attended",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "Math Session 1",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "",
    "OS": "",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "downloaded",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "Math 2 Resources Guide (PDF)",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "attended",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "Math Session 2",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "",
    "OS": "",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "started",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Quiz Bank",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "suspended",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Quiz Bank",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "completed",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Quiz Bank",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : "50%"
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "started",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Practice test",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "suspended",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Practice test",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "completed",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "GRE Practice test",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : "60%"
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "viewed",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "Stress Mgmt. Part 4: On Test Day",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    },

    {
    "userId" : userId,
    "userName" : userName,
    "verb" : "reviewed",
    "program" : "GRE",
    "product" : "GRE Advantage: The New GRE - On Site",
    "asset" : "Graduate Admissions Workshop",
    "time" : new Date(),
    "location" : "New York, New York",
    "browser" : "Chrome",
    "OS": "Windows 7",
    "score" : null
    }
];

db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) { });
    });

};

var populateGMAT = function (userId, userName) {
    var events = [
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "started",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : null,
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "viewed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "10 Things You Need to Know About Your GMAT Course",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "downloaded",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "Course Booklet for Quantitative Strategy (PDF)",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "viewed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "Lesson-on-Demand: GMAT Quantitative Strategy",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "viewed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "Lesson-on-Demand: Proportions & Math Formulas",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "viewed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "Lesson-on-Demand: Statistics",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "viewed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "Lesson-on-Demand: Geometry",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },
    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "started",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "GMAT Diagnostic (CAT 1)",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },

    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "suspended",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "GMAT Diagnostic (CAT 1)",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },

    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "completed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "GMAT Diagnostic (CAT 1)",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : "70%"
    },


    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "downloaded",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "Integrated Reasoning Session ReKap (PDF)",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },

    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "started",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "GMAT Prep CAT 1",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },

    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "suspended",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "GMAT Prep CAT 1",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : null
    },

    {
        "userId" : userId,
        "userName" : userName,
        "verb" : "completed",
        "program" : "GMAT",
        "product" : "GMAT On Demand",
        "asset" : "GMAT Prep CAT 1",
        "time" : new Date(),
        "location" : "New York, New York",
        "browser" : "Chrome",
        "OS": "Windows 7",
        "score" : "70%"
    }

    ];

    db.collection('events', function (err, collection) {
        collection.insert(events, { safe: true }, function (err, result) { return 1 });
    });
}

var populateDB = function() {
 
    var events = [
    {
	    "userId" : 1235,
	    "userName" : "Prashant Bansal",
	    "verb" : "started",
	    "program" : "LSAT",
	    "product" : "GRE Advantage: The New GRE - On Demand",
	    "asset" : null,
	    "time" : new Date('Dec 03, 2012'),
	    "location" : "New York, New York",
	    "browser" : "Chrome",
	    "OS": "Windows 7",
	    "score" : ""
    },
    {
	    "userId" : 1235,
	    "userName" : "Prashant Bansal",
	    "verb" : "viewed",
	    "program" : "LSAT",
	    "product" : "GRE Advantage: The New GRE - On Demand",
	    "asset" : "GRE Orientation Video",
	    "time" : new Date('Dec 04, 2012'),
	    "location" : "New York, New York",
	    "browser" : "Chrome",
	    "OS": "Windows 7",
	    "score" : ""
    }  
    
    ];
 
    db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) {});
    });
 
};