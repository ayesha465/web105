const User=require('./models/user');
//const {auth} =require('./middlewares/auth');
var userRoute = require('./routes/route');
const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
//const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);


const app=express();
// app use
//app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use('/users', userRoute);

//app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err){
        console.log(err)
    };
    console.log("database is connected");
});
app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});

app.post('/api/register',function(req,res){
    // taking a user
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    User.addUser(user, (err, result)=>{
        if(err){
            return res.json({success: false, message: err});
        }
        return res.json({success: true, message: result});
    });
 });

 app.post('/api/login', function(req,res){
    User.login(req.body.email, req.body.password, (err, result)=>{
        if(err){
            return res.json({success: false, message: err});
            
        }
        console.log(result)
        return res.json({success: true, message: result});
        
    });
});




