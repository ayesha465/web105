const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser =require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const uri= "mongodb+srv://test:test123@cluster0.ubeeql6.mongodb.net/myfirstdb?retryWrites=true&w=majority"

async function connect()
{
    try{
        await mongoose.connect(uri);
        console.log("connected to Mongodb");

    }catch(error){
        console.error(error);
        
    }
}

connect();




//create a schema
const notesSchema ={
    username :String,
    password :String

}
const Note = mongoose.model("Note",notesSchema);

app.set('view engine','hbs');

app.use('/static',express.static(path.join(__dirname,'public')));


app.get("/" , (req, res) => {
     res.render('base',{title:"login System"});
})

app.post("/",function(req,res)
{
    let newNote=new Note
    ({
        username :req.body.username,
        password :req.body.password
    });
    newNote.save(),
    res.redirect('/')
})

app.listen(3000, function() {
    console.log("server started at port no 3000");
})
