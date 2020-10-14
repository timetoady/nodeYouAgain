const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });