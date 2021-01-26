#!/usr/bin/env node

const ora = require('ora');
const chalk = require('chalk');
const figlet = require('figlet');

const { getCode } = require('country-list');
const axios = require('axios').default;

let argsInput = process.argv.slice(2);

let countryInput = argsInput[0];
let yearInput = argsInput[1];

console.log(chalk.cyanBright(countryInput));

//converti le nom du pays en code à 2 chiffres qui est utilisé pr l'url
let countryCode = getCode(countryInput);
console.log(chalk.cyanBright(countryCode));

let currentYear = new Date().getFullYear()
console.log(chalk.cyanBright(currentYear));

let URLApi = "https://date.nager.at/Api/v2/PublicHolidays/" + yearInput + "/" + countryCode;
console.log(chalk.whiteBright(URLApi));

axios.get(URLApi)
    .then(function (response) {
        let items = response.data;
        items.forEach((item, index) => {
            console.log(chalk.blueBright(
                `${index + 1} : ${item.date} - ${item.name} (${item.localName})`
            ));
        });
    })


//style 4 the  cli

const spinner = ora().start();
setTimeout(() => {
    spinner.color= 'yellow';
	spinner.text = 'Infinite Loading / Press ctrl c ';
}, 6000);

figlet('Days-Off Checker', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});


//raccourci -> librairie de la requete -> httpRequest.open('GET', '/demo.php?city=montpellier', true)
// axios.get("https://date.nager.at/Api/v2/PublicHolidays/2021/BE");
//axios prends les valeurs de ce doc et les retournes -> https://date.nager.at/api/v2/PublicHolidays/2002/BE


//DOC:
//https://practicalprogramming.fr/node-js-api/
//https://github.com/JustFS/node-api/blob/master/index.js

// API:
//https://date.nager.at/Api