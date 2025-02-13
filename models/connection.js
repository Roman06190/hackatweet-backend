const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://romandelpias:Roman200628@cluster0.osexk.mongodb.net/kackatweet";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))

  .catch((error) => console.error(error));
