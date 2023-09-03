//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const date = require(__dirname + "/date.js");

const app = express();

//setting the view engine to use ejs
app.set('view engine', 'ejs');

//setting to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

//setting to use static files i.e. css,image etc.
app.use(express.static("public"));

//connecting mongodb
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//creating mongodb schema
const itemsSchema =  new mongoose.Schema({
  name: String
});

//creating model using schema
const Item = mongoose.model("Item",itemsSchema);

//inserting document
const item1 = new Item({
  name: "Pray"
});

const item2 = new Item({
  name: "Eat"
})


const item3 = new Item({
  name: "Face Fear"
})

const item4 = new Item({
  name: "Read"
})

//inserting the items in an array
const defaultItems = [item1,item2,item3,item4];


app.get("/", function(req, res) {

  //const day = date.getDate();
  Item.find().then(function(items){
    if(items.length === 0){
      Item.insertMany(defaultItems).then(function(item){
        console.log("Inserted Items");
      }).catch(function(error){
        console.log(error);
      });
      res.redirect("/");
    }else{
    res.render("list", {listTitle: "Today", newListItems: items});
    }
  }).catch(function(error){
    console.log(error);
  });
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
