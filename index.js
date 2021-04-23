// Import necessary core modules
const path = require('path')
const fs = require('fs')

// Import necessary npm modules
const express = require('express')
const mongoose = require('mongoose')

// Assign express() function to variable app
const app = express()

// App settings
require('dotenv').config(path.join(__dirname, '.env'))
app.set('view engine', 'ejs')

// Add middleware functions
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

// Use routes
const pathToRoutes = path.join(__dirname, 'routes')
fs.readdir(pathToRoutes, (err, files) => {
   files.forEach(file => {
      const Router = require(path.join(pathToRoutes, file))
      app.use(Router.path, Router.router)
   })
})

// Connect to mongodb database and run server
;(async _ => {
   try {
      const url = 'mongodb+srv://sultonbayevogabek:Ogabek19991031@cluster-1.bxd4x.mongodb.net/eshopper'
      await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
      const PORT = process.env.PORT
      app.listen(PORT, () => {
         console.log(`Connected to database and running on http://localhost:${PORT}`)
      })
   } catch (e) {
      console.log(e)
   }
})()