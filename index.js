const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//Access MongoDB
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Load two main product files
const Controller = require("./products/controllers");
const Manufacturers = require("./products/manufaturers");

//Basic greeting message at base URL
app.get("/", (_, res) => {
  res.send("Game controller info storage.");
});

//check errors function
const checkError = (err, res) => {
  err && res.send(`Looks like we've got an Error: ${err}`);
};

//Create Controller entry
app.post("/controllers", (req, res) => {
  Controller.create(
    {
      name: req.query.name,
      category: req.query.category,
      cost: req.query.cost,
      quantity: req.query.quantity,
      manufacturer: req.query.manufacturer,
    },
    (err) => {
      err
        ? res.send(`Looks like we've got an Error: ${err}`)
        : Controller.find((err, manufacturers) => {
            checkError(err, res);
          })
            .populate("manufacturer")
            .exec(function (err, controller) {
              err
                ? res.send(`Oops! There was an error: ${err}`)
                : res.json(controller);
            });
    }
  );
});

//Create Manufacterer entry
app.post("/manufacturers", (req, res) => {
  Manufacturers.create(
    {
      name: req.query.name,
      address: req.query.address,
      phone: req.query.phone,
    },
    (err) => {
      err
        ? res.send(`Looks like we've got an Error: ${err}`)
        : Manufacturers.find((err, manufacturers) => {
            checkError(err, res);
            res.json(manufacturers);
          });
    }
  );
});

//Get all current controllers
app.get("/controllers", (req, res) => {
  Controller.find((err, controllers) => {
    checkError(err, res);
  })
    .populate("manufacturer")
    .exec(function (err, controller) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(controller);
    });
});

//Get all current manufacterers
app.get("/manufacturers", (req, res) => {
  Manufacturers.find((err, manufacturers) => {
    checkError(err, res);
    res.json(manufacturers);
  });
});

//find a specific controller by name
app.get("/controllers/:name", (req, res) => {
  const { name } = req.params;
  Controller.findOne({ name: `${name}` }, (err, controller) => {
    if (err) res.send(`Error was: ${err}`);
    if (null) res.send(`${name} not found`);
    res.json(controller);
  });
});

//Delete a controller by id
app.delete("/controllers/:id", (req, res) => {
  Controller.remove({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Controller ID ${req.params.id} removed`);
  });
});

//delete a manufacturer by id
app.delete("/manufacturers/:id", (req, res) => {
  Manufacturers.remove({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Manufacturer ID ${req.params.id} removed.`);
  });
});

//Find and change document key's value by id via direct params
app.put("/controllers/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Controller.findByIdAndUpdate(id, data, { new: true }, function (
    err,
    controller
  ) {
    err ? res.send(`Survey says: Error! ${err}`) : res.json(controller);
  });
});

//Find and change document key's value by id via direct params
app.put("/manufacturers/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Manufacturers.findByIdAndUpdate(id, data, { new: true }, function (
    err,
    manufacturer
  ) {
    err ? res.send(`Survey says: Error! ${err}`) : res.json(manufacturer);
  });
});

// //To populate manufacturer area in controllers
// app.put("/controllers/:id", (req, res) => {
//   const { id } = req.params;
//   Controller.findOne({ _id: `${id}` })
//     .populate("manufacturer")
//     .exec(function (err, controller) {
//       err ? res.send(`Oops! There was an error: ${err}`) : res.json(controller);
//     });
// });

//Find all controllers by manufacturer ID
app.get("/controllersByManu/:manuID", (req, res) => {
  const { manuID } = req.params;
  console.log(manuID)
  Controller.find({ manufacturer: {$all: [manuID]} }, (err) => {
    checkError(err, res);
  })
    .populate("manufacturer")
    .exec(function (err, controller) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(controller);
    });
});

// Controller.findOne({ name: `${name}` }, (err, controller) => {
//   if (err) res.send(`Error was: ${err}`);
//   if (null) res.send(`${name} not found`);
//   res.json(controller);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
