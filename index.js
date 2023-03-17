import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import areasRouter from './router/areas-router.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8082

app.use(express.json())

app.use('/api/v0', areasRouter)


const start = async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(
            process.env.DB_CONNECT,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
