import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors(({
    origin: "http://localhost:5173"
})))

app.get('/', (req, res) => {
    res.send("Hellow World!")
})

app.listen(5000, () => console.log("Server running on port 5000"));