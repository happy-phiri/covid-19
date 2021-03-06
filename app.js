const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const fetch = require('node-fetch');
const { json } = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Variables for the country search

let countrySearched 
let totalCases
let totalDeaths 
let countryFlag 
let casesToday 
let deathsToday 
let recoveredToday 
let totalRecovered 
let activeCases 
let criticalCases 
let totalTests 
let population 

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

// Statistics For All Continents

let settings = { method: "POST" };

const URL = "https://corona.lmao.ninja/v2/continents?yesterday=true&sort";

fetch(URL)
.then(function(response){
    return response.json();
})
.then(function(json){
    continentCovidData = json;
    
    fetch("/statistics", {
        continentCovidData: continentCovidData
    }).catch((err) => {
        console.log(err);
    });
});


app.get("/statistics", function(req, res){
    res.render("statistics", {
        continentCovidData: continentCovidData
    });
});

 //Routes for the country search box
 app.get("/fail", function(req, res){
     res.render("fail");
 });

app.post("/statistics", function(req, res){
    countrySearched = _.upperCase(req.body.searchCountry);
    const url = 'https://corona.lmao.ninja/v2/countries/' + countrySearched +'?yesterday&strict&query%20';

    https.get(url, function(response){
        let data;
        response.on("data", function(chunk){
            console.log(response.statusCode);
            
            if (!data) {
                data = chunk;
              } else {
                data += chunk;
              }
        }); 
            
        response.on("end", function() {
            const countryCovidData =JSON.parse(data);
    
            if(response.statusCode != 404){

                //const countryCovidData = JSON.parse(data);
                totalCases = countryCovidData.cases.toLocaleString();
                countryFlag = countryCovidData.countryInfo.flag;
                casesToday = countryCovidData.todayCases.toLocaleString();
                deathsToday = countryCovidData.todayDeaths.toLocaleString();
                recoveredToday = countryCovidData.todayRecovered.toLocaleString();
                totalDeaths = countryCovidData.deaths.toLocaleString();
                activeCases = countryCovidData.active.toLocaleString();
                criticalCases = countryCovidData.critical.toLocaleString();
                totalTests = countryCovidData.tests.toLocaleString();
                totalRecovered = countryCovidData.recovered.toLocaleString();
                population = countryCovidData.population.toLocaleString();
                res.redirect("/results");

            } else {
                res.redirect("/fail");
            }      
        });
    });
});

app.get("/results", function(req, res){
        res.render("results", {
            countrySearched: countrySearched, 
            countryFlag: countryFlag,
            population: population,
            totalCases: totalCases,
            totalDeaths: totalDeaths,
            totalTests: totalTests,
            totalRecovered: totalRecovered,
            casesToday: casesToday,
            deathsToday: deathsToday,
            recoveredToday: recoveredToday,
            activeCases: activeCases,
            criticalCases : criticalCases
        });
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});