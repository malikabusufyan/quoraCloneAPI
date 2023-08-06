const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const passport_JWT = require("./config/passpoet_JWT");

//Middleware for using routes
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/index"));

app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running Server ${error}`);
  }
  console.log(`Server is Up and Running on port ${port}`);
});
