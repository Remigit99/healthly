import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); 

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import router from './routes/user.route.js';
// import userRoutes from "./routes/user.route.js"

dotenv.config()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_DEV
];


const app = express()

app.use(express.json())
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use("/api/user", router)


const PORT = process.env.PORT || 3300

// console.log(process.env.FRONTEND_URL)

app.listen(PORT, async() => {
    await connectDB()
  console.log(`Server is running on port ${PORT}`)
})


