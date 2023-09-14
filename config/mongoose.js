const mongoose = require("mongoose");
//Set up default mongoose connection

mongoose
  .connect(
    "mongodb+srv://malikabusufyan:6CAO1vHLr8ZmI6sd@cluster0.wu21t2f.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully Connected to Database");
  })
  .catch((error) => {
    console.log("Error while connecting the Database ", error);
  });
