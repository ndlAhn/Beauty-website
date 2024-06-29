const express = require('express')
const app = express()
const port = 5001
const db = require("./models")

db.sequelize.sync({alter:true})


app.listen(port,() => 
{
    console.log("Listen on port ",port)
})

