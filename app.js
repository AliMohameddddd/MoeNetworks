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
if (username==='admin' && password=='admin'){
  res.redirect('/home');
}
else{
  res.render('login', { error: "Invalid username or password. Please try again." });
}

});  


app.get('/home', function (req, res) {
  
  if (!req.session.username) {
    res.redirect('/');
  } else {
    res.render('home');
  }
});

  
app.post('/home',function (req,res) {
  res.render('home');
});

app.get('/islands',function (req,res) {
 
  if(!req.session.username){
    res.redirect('/')
  }
  else{
    res.render('islands');
} }); 

app.post('/islands',function (req,res) {
  res.render('islands');
});

app.get('/annapurna',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
  res.render('annapurna');}
});

app.post('/annapurna', function (req, res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
  res.render('annapurna');}
});

  app.get('/bali',function (req,res) {
    if(!req.session.username){
      res.redirect('/')
    }
    else{
    
    res.render('bali');
}});

app.post('/bali', function (req, res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
  
  res.render('bali');
}});
app.get('/cities',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
  
  res.render('cities');
}});
app.post('/cities',function (req,res) {
  res.render('cities');
});
app.get('/hiking',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
  
  res.render('hiking');
}});
app.post('/hiking',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
  
  res.render('hiking');
}});
app.get('/paris',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('paris');}});
app.post('/paris', function (req, res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('paris');}});


  app.get('/registration',function (req,res) {
  res.render('registration');
});

app.post('/registration', (req, res) => {
  res.render('registration');
});
app.get('/santorini',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('santorini');
}});
app.post('/santorini',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('santorini');
}});

app.get('/search',function (req,res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('searchresults');
}});
app.post('/search', function(req, res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('searchresults');
}});

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
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('inca');
}});
app.post('/inca', function (req, res) {
  if(!req.session.username){
    res.redirect('/')
  }
  else{
 
  res.render('inca');
}});

app.get('/rome',function (req,res) {console.log(req.session.username)
  if(req.session.username ==null){
    
    res.redirect('/')
  }
  else{
  res.render('rome');
  }});



  app.post('/rome', function (req, res) {
    if(req.session.username ==null){
    
      res.redirect('/')
    }
    else{
    res.render('rome');
    }});
  
  
  app.get('/wanttogo', (req, res) => {
    const wantToGoList = req.session.wantToGoList || [];
    if(!req.session.username){
      res.redirect('/')
    }
    else{
   
    res.render('wanttogo', { wantToGoList: wantToGoList });
  }});

  app.post('/wanttogo', function(req, res) {
    const wantToGoList = req.session.wantToGoList || [];
    if(!req.session.username){
      res.redirect('/')
    }
    else{
   
    res.render('wanttogo', { wantToGoList: wantToGoList });
  }});

  
app.listen(3000);