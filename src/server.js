require('dotenv').config()
const app = require("./app/app")
const connectDB = require('./db/index')

// Sync models with the database
connectDB()
.then(()=>{
  app.listen(process.env.PORT  || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT }`);
  });
})
.catch((error)=>{
  console.log("MONGO db connection failed !!! ", error)
})
