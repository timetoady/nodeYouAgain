const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://adman85:BiSwaSS21-@cluster0.saqjx.mongodb.net/controllers?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Controller = require("./products/controllers");

//create one

app.get("/", (_, res) => {
  res.send("Game controller info storage.");
});

// app.get('/controllers', (req, res) =>{
//   const instance = await Controller.findOne({ ... });
// })

app.post("/controllers", (req, res) => {
  Controller.create({
    name: req.query.name,
    category: req.query.category,
    cost: req.query.cost,
    quantity: req.query.quantity,
    
    
  }, (err, controllers) =>{
    if(err) {res.send(`Ruh row. That didn't work. Here's the error: ${err}`)}
      Controller.find((err, controllers) =>{
        if(err) {res.send(`Hrm. Error: ${err}`)}
        res.json(controllers)
      })
  });
});

//find a specific document




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
