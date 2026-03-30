import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); 

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import router from './routes/user.route.js';
// import userRoutes from "./routes/user.route.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/api/user", router)


const PORT = process.env.PORT || 3300

app.listen(PORT, async() => {
    await connectDB()
  console.log(`Server is running on port ${PORT}`)
})


