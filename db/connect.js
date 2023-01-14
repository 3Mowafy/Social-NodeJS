const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DBNAME, { dbName: "my-project" });

module.exports = mongoose;
