const mongoose = require("mongoose");
//Set up default mongoose connection

mongoose
  .connect("mongodb://127.0.0.1:27017/quotation")
  .then(() => {
    console.log("Successfully Connected to Database");
  })
  .catch((error) => {
    console.log("Error while connecting the Database ", error);
  });
