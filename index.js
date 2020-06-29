const express		=require("express"),
      app			=express(),
      bodyParser	=require("body-parser"),
	  mongoose		=require("mongoose"),
	  multer        =require("multer"),
	  path          =require("path");


mongoose.connect('mongodb://localhost:27017/form', {useNewUrlParser: true ,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use('/static', express.static(__dirname + '/public'));

var Storage = multer.diskStorage({
	destination:"uploads/",
	filename:(req,file,cb)=>{
		cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
	}
});

const upload = multer({
	storage:Storage
}).any('file');

//SCHEMA SETUP
let dataSchema = new mongoose.Schema(
{
	covid: String,
	country: String,
	age: String,
	sex: String,
	covid1: Object,
	covid2: String,
	date: String,
	myFile: String,
	covid3: String,
	text: String,
	covid4: String,
	mail: String,
	comments: String,
});

let Data=mongoose.model("Data", dataSchema);

app.get("/",function(req,res)
	   {
	res.render("form");
});

app.post("/form",upload,function(req,res)
		{
	const newData={
	covid: req.body.covid,
	country: req.body.country,
	age: req.body.age,
	sex: req.body.sex,
	covid1: req.body.covid1,
	covid2: req.body.covid2,
	date: req.body.date,
	// myFile: req.file.filename,
	covid3: req.body.covid3,
	text: req.body.text,
	covid4: req.body.covid4,
	mail: req.body.mail,
	comments: req.body.comments,
	};
	console.log(req.body);
	//create a new campground and save to DB
	Data.create(newData,function(err,newlyCreated)
					 {
		if(err)
			{
				console.log(err);
			}
		else{
			res.redirect("/");
		}
	})
});

app.listen(process.env.PORT || 3000,function()
		  {
	console.log("The Form Server has Started!!!");
});