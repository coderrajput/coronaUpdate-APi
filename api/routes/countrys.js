const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');

const Country= require('./../models/country');

router.get('/',(req,res,next)=>{
    Country.find().then(results=>{
        res.status(200).json({
            message:'List of countries',
            countries: results
        });
    }).catch(err=>console.log(err));
});


router.get('/:countryName',(req,res,next)=>{
    const countryName= req.params.countryName;
    Country.find({
        country: countryName
    }).then(country=>{
        res.status(200).json({
            message: 'Handling GET requests to /products',
            countries: country
        });
    }).catch(err=>console.log(err));
});



module.exports= router;