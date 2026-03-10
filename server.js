const express = require("express")
const app = express()

const orderRoutes = require("./routes/orderRoutes")

app.use(express.json())

app.use("/", orderRoutes)

app.listen(3000, () => {
 console.log("API rodando em http://localhost:3000")
})