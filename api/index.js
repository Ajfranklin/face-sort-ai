import express from 'express'
import cors from 'cors'
import router from './routes.js'

const app = express()

app.use(cors(({
    origin: "http://localhost:5173"
})))

app.use("/", router)

app.listen(5000, () => console.log("Server running on port 5000"));