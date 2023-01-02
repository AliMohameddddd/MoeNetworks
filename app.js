var express = require('express');
var path = require('path');
var app = express();
const session = require('express-session');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const MongoStore = require('connect-mongo');
  app.use(session({
    store: new MongoStore({
      mongoUrl: 'mongodb://127.0.0.1:27017'
    }),
    secret: '123',
    resave: false,
    saveUninitialized: true,
  }));
var MongoClient=require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  if(err) throw err;
  var db = client.db('myDB');
  
});
app.get("/",function (req,res) {
  res.render('login');
});

app.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;  
  req.session.username = username;

  if(username == "admin" && password == "admin"){
    req.session.username = username; 
    res.redirect('/home');
  }
  else{
    res.render('login', { error: "Invalid username or password. Please try again." });
  }
});  


  app.get('/home',function (req,res) {
    res.render('home');
  });
  
app.post('/home',function (req,res) {
  res.render('home');
});

app.get('/islands',function (req,res) {
  if(!req.session.username){
    res.redirect("/")
  }
  else{
    res.render('islands');
  }

});

app.post('/islands',function (req,res) {
  res.render('islands');
});

app.get('/annapurna',function (req,res) {
  res.render('annapurna');
});

app.post('/annapurna', function (req, res) {
  const wantToGoList = req.session.wantToGoList || [];
  MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
      if (err) throw err;
      if (wantToGoList.includes('annapurna')) {
        res.status(400).json({ error: 'This destination is already in your want-to-go list' });
      } else {
        req.session.wantToGoList.push('annapurna');
        db.collection('myCollection').updateOne({ username: req.session.username }, { $set: { wantToGoList: req.session.wantToGoList } }, function(err, result) {
          if (err) throw err;
          res.json({ message: 'Destination added to want-to-go list' });
        });
      }
    });
  });
});

  app.get('/bali',function (req,res) {
  res.render('bali');
});

app.post('/bali', function (req, res) {
  const wantToGoList = req.session.wantToGoList || [];
  MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
      if (err) throw err;
     
        if (wantToGoList.includes('bali')) {
          res.status(400).json({ error: 'This destination is already in your want-to-go list' });
        } else {
          req.session.wantToGoList.push('bali');
          db.collection('myCollection').updateOne({ username: req.session.username }, { $set: { wantToGoList: req.session.wantToGoList } }, function(err, result) {
            if (err) throw err;
            res.json({ message: 'Destination added to want-to-go list' });
          });
        }
      });
    });
  });
  
app.get('/cities',function (req,res) {
  res.render('cities');
});
app.post('/cities',function (req,res) {
  res.render('cities');
});
app.get('/hiking',function (req,res) {
  res.render('hiking');
});
app.post('/hiking',function (req,res) {
  res.render('hiking');
});
app.get('/paris',function (req,res) {
  res.render('paris');
});
app.post('/paris', function (req, res) {
  const wantToGoList = req.session.wantToGoList || [];
  MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
      if (err) throw err;
      if (wantToGoList.includes('paris')) {
        res.status(400).json({ error: 'This destination is already in your want-to-go list' });
      } else {
        req.session.wantToGoList.push('paris');
        db.collection('myCollection').updateOne({ username: req.session.username }, { $set: { wantToGoList: req.session.wantToGoList } }, function(err, result) {
          if (err) throw err;
          res.json({ message: 'Destination added to want-to-go list' });
        });
      }
    });
  });
});

  app.get('/registration',function (req,res) {
  res.render('registration');
});

app.post('/registration', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  req.session.username = username;
  req.session.wantToGoList = [];  // Initialize the want-to-go list for the user
  if (!username || !password) {
    // Set the error variable and render the registration page again
    res.render('registration', { error: 'Please enter a username and password' });
  } else {
    // Connect to the database
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
      if (err) throw err;
      var db = client.db('myDB');

      // Check if the username is already taken
      db.collection('myCollection').findOne({ username: username }, function(err, result) {
        if (err) throw err;

        if (result) {
          // Set the error variable and render the registration page again
          res.render('registration', { error: 'Username is already taken' });
        } else {
          // Insert the new user into the database and redirect to the home page
          db.collection('myCollection').insertOne({ username: username, password: password, wantToGoList: req.session.wantToGoList });
          res.redirect('/home');
        }
      });
    });
  }
});
app.get('/santorini',function (req,res) {
  res.render('santorini');
});
app.post('/santorini',function (req,res) {
  const wantToGoList = req.session.wantToGoList || [];
  MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
      if (err) throw err;
      if (wantToGoList.includes('santorini')) {
        res.status(400).json({ error: 'This destination is already in your want-to-go list' });
      } else {
        req.session.wantToGoList.push('santorini');
        db.collection('myCollection').updateOne({ username: req.session.username }, { $set: { wantToGoList: req.session.wantToGoList } }, function(err, result) {
          if (err) throw err;
          res.json({ message: 'Destination added to want-to-go list' });
        });
      }
    });
  });
});

app.get('/search',function (req,res) {
  res.render('searchresults');
});
app.post('/search', function(req, res) {
  // Initialize the keyword variable to an empty string
  let keyword = '';
  // If the keyword property exists in the req.body object, assign it to the keyword variable
  if (req.body.keyword) {
    keyword = req.body.keyword;
  }

  // If the keyword variable is still empty, check if the Search property exists in req.body
  if (req.body.keyword === '' && req.body.Search) {
    keyword = req.body.Search;
  }

  MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Error connecting to database');
      return;
    }
      var db = client.db('myDB');
   
    db.collection('myCollection').find({ place: { $regex: String(keyword), $options  : 'i' } }).toArray(function(err, destinations) {
      if (err) {
        console.error('Error searching destinations:', err);
        res.status(500).send('Error searching destinations');
        return;
      }

      if (destinations.length === 0) {
        res.render('searchresults', { error: 'Destination not found' });
      } else {
        res.render('searchresults', { destinations: destinations });
      }
    });
  });
});

 app.post('/destination', function(req, res) {
    const place = req.body.destination;

    if (place === 'rome') {
      res.redirect('/rome');
    } else if (place === 'paris') {
      res.redirect('/paris');
    } else if (place === 'annapurna') {
      res.redirect('/annapurna');
    } else if (place === 'bali') {
      res.redirect('/bali');
    } else if (place === 'santorini') {
      res.redirect('/santorini');
    } else if (place === 'inca') {
      res.redirect('/inca');
    }
  });
app.get('/inca',function (req,res) {
  res.render('inca');
});
app.post('/inca', function (req, res) {
  const wantToGoList = req.session.wantToGoList || [];
  MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
      if (err) throw err;
      if (wantToGoList.includes('inca')) {
        res.status(400).json({ error: 'This destination is already in your want-to-go list' });
      } else {
        req.session.wantToGoList.push('inca');
        db.collection('myCollection').updateOne({ username: req.session.username }, { $set: { wantToGoList: req.session.wantToGoList } }, function(err, result) {
          if (err) throw err;
          res.json({ message: 'Destination added to want-to-go list' });
        });
      }
    });
  });
});
app.get('/rome',function (req,res) {
  res.render('rome');
  });
  app.post('/rome', function (req, res) {
    const wantToGoList = req.session.wantToGoList || [];
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
      if (err) {
        console.error('Error connecting to database:', err);
        res.status(500).send('Error connecting to database');
        return;
      }
      var db = client.db('myDB');
      db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
        if (err) {
          console.error('Error finding user in database:', err);
          res.status(500).send('Error finding user in database');
          return;
        }
        if (wantToGoList.includes('rome')) {
          res.status(400).json({ error: 'This destination is already in your want-to-go list' });
        } else {
          req.session.wantToGoList.push('rome');
          db.collection('myCollection').updateOne({ username: req.session.username }, { $set: { wantToGoList: req.session.wantToGoList } }, function(err, result) {
            if (err) {
              console.error('Error updating user in database:', err);
              res.status(500).send('Error updating user in database');
              return;
            }
            res.json({ message: 'Destination added to want-to-go list' });
          });
        }
      });
    });
  });
  
  function isValidUser(username, password, callback) {
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
      if (err) throw err;
      var db = client.db('myDB');
              db.collection('myCollection').findOne({ username: username, password: password }, function(err, result) {
        if (err) throw err;
        callback(result);
      });});}
  app.get('/wanttogo', (req, res) => {
    const wantToGoList = req.session.wantToGoList || [];
    res.render('wanttogo', { wantToGoList: wantToGoList });
  });

  app.post('/wanttogo', function(req, res) {
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
      if (err) {
        console.error('Error connecting to database:', err);
        res.status(500).send('Error connecting to database');
        return;
      }
      var db = client.db('myDB');
      db.collection('myCollection').findOne({ username: req.session.username }, function(err, user) {
        if (err) throw err;
        if (user) {
          res.render('wanttogo', { wantToGoList: user.wantToGoList });
        } else {
          res.render('wanttogo', { wantToGoList: [] });
        }
      });
    });
  });
  
   var MongoClient=require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  if(err) throw err;
  var db = client.db('myDB');
});
app.listen(3000)