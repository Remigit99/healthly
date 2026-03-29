import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); 

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3300

app.listen(PORT, async() => {
    await connectDB()
  console.log(`Server is running on port ${PORT}`)
})


