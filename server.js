//Packages:
const excel = require('exceljs')
const express = require('express')
const connectDB = require('./config/database')
var path = require('path')
const app = express()


//Routes: 
const mainRoutes = require('./routes/mainRoutes')


//dotenv for Port and DB connection string 
require('dotenv').config({path: './config/.env'})


connectDB()

//Express settings
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Set route path
app.use('/', mainRoutes)    


//Run server:
app.listen(process.env.PORT, ()=>{
  console.log(`The server is running on port ${process.env.PORT}`)
}) 

