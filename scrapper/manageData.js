const mongoose=require('mongoose');

const Country= require('./../api/models/country');

var saveCountryList=(countryList)=>{
    Country.insertMany(countryList,(error,docs)=>{
        if(error)console.log(error);
        else console.log(docs);
    })
}

var deleteCountryList= ()=>{
    Country.deleteMany().then(val=>
        console.log('all entries deleted')
    ).catch((err) => console.log(err));
};

module.exports= {
    saveList: saveCountryList,
    deleteList: deleteCountryList
}