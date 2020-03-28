
const axios= require('axios');
const HTMLParser = require('node-html-parser');

const save= require('./manageData');

const mongoose= require('mongoose');



var url= 'https://www.worldometers.info/coronavirus/';



function filterArray(value,i,arr){
   
    return value.nodeType===1;
}

var fetchData=()=>{
    var body='';
var root='';
var rootData='';
var filterData=[];
var countries=[];
    axios.get(url).then((response)=>{
   
        body=response.data;
     
     root= HTMLParser.parse(body);
        rootData= root.querySelector('#main_table_countries_today').childNodes[3].childNodes;
        filterData=rootData.filter(filterArray);
        filterData.forEach((val,index)=>{
    
                var tdfilter= val.childNodes.filter(filterArray);
                var myObj={
                    country:tdfilter[0].rawText.trim(),
                    totalCases:tdfilter[1].rawText.trim(),
                    newCases:tdfilter[2].rawText.trim(),
                    totalDeath:tdfilter[3].rawText.trim(),
                    newDeaths:tdfilter[4].rawText.trim(),
                    totalRecovered:tdfilter[5].rawText.trim(),
                    activecases:tdfilter[6].rawText.trim(),
                    critical:tdfilter[7].rawText.trim(),
                    totcasesper1mpop:tdfilter[8].rawText.trim(),
                    deathsper1mpop:tdfilter[9].rawText.trim(),
                    firstcase :tdfilter[10].rawText.trim()
                };
              
            
                //console.log(myObj);
                countries.push(myObj);
        });
    
        
        save.saveList(countries);
        //save.deleteList();
    
    }).catch((error)=>{
        console.log(error);
    })
    
}
 

module.exports=fetchData;


