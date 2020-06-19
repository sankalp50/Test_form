const express		=require("express"),
      app			=express(),
      bodyParser	=require("body-parser"),
      mongoose		=require("mongoose");


mongoose.connect('mongodb://localhost:27017/form', {useNewUrlParser: true ,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//SCHEMA SETUP
let dataSchema = new mongoose.Schema(
{
	covid: String,
	covid1: Object,
	covid2: String,
	date: String,
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

app.post("/form",function(req,res)
		{
	const newData={
    covid: req.body.covid,
	covid1: req.body.covid1,
	covid2: req.body.covid2,
	date: req.body.date,
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