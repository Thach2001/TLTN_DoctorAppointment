const mongoose = require("mongoose");

// connect database
async function connectDatabase() {
   try {
      await mongoose.connect(
         `mongodb://127.0.0.1:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`
      );
      console.log("Connect database success");
   } catch (error) {
      console.log("Connect database fail", error);
   }
}

module.exports = connectDatabase;
