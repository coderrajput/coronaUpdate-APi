const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const scrapper= require('./scrapper/scrapper');
const scheduler= require('node-cron');
const axios= require('axios');

scheduler.schedule('30 0 * * *', () => {
  scrapper();
});
  

scrapper();
const uri = "mongodb+srv://coderrajput:coderrajput@cluster0-2r9a5.mongodb.net/test?retryWrites=true&w=majority";

// mongoose.connect('mongodb://localhost:27017/corona',{useNewUrlParser: true});

mongoose.connect(uri,{useNewUrlParser: true});

const countryRoutes = require("./api/routes/countrys");


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/countries", countryRoutes);
app.get('*', function(req, res){
   res.redirect('/countries');
});

app.use("/incoming",(req,res,next)=>{
  axios.post('https://api.telegram.org/bot1239110605:AAGshkiCwoIIlTxj7L0HlkfZJ4M132gkGGI/sendMessage',{
                    chat_id: "850830218",
                    text: `${req}`
                }).then(resp=>{
                    console.log(resp.data.result);
                }).catch(err=>console.log(err));
  res.send();}
  );

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
