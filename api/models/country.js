const mongoose= require('mongoose');
var Schema= mongoose.Schema;

var countrySchema= new Schema({
    
    country: String,
    totalCases:  String,
    newCases:  String,
    totalDeath:  String,
    newDeaths:  String,
    totalRecovered:  String,
    activecases:  String,
    critical: String,
    totcasesper1mpop:  String,
    deathsper1mpop:  String,
    firstcase :String
});


module.exports=mongoose.model('Country', countrySchema);