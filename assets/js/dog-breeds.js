const apiKEY = "5Ng5KCn+rvjkpNagvsh0Cg==iqEQFjzT9ajCB9np";
const request = "https://api.api-ninjas.com/v1/dogs?shedding=3&barking=3&energy=3";

// Section Elements
var breedList = document.getElementById('breedSelection');
var breedInfoSection = document.getElementById('d-none');

// STAT Elements
var minLife = document.getElementById('minL');
var maxLife = document.getElementById('maxL');
var shedding = document.getElementById('shedding');
var barking = document.getElementById('barking');
var energy = document.getElementById('energy');
var protectiveness = document.getElementById('protectiveness');
var trainability = document.getElementById('trainability');

var breedBtn = document.querySelectorAll('.breed');

// ARRAYS
var breedSelectionList = [];
var breedAttributes = []; // blank array for breed attributes by breed

console.log("hello");

// Buttons
fetch(request, {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKEY,
    }
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.setAttribute('class', 'breed');
        listItem.setAttribute('id', data[i].name);
        listItem.textContent = data[i].name;
        breedList.appendChild(listItem);
    }
    for (var i = 0; i < data.length; i++) {
        breedName.textContent = data[i].name;
        minLife.textContent = "Max Life Expectancy: " + data[i].min_life_expectancy + " years";
        maxLife.textContent = "Minimum Life Expectancy: " + data[i].max_life_expectancy + " years";
        shedding.textContent = "Shedding: " + data[i].shedding;
        barking.textContent = "Barking: " + data[i].barking;
        energy.textContent = "Energy: " + data[i].energy;
        protectiveness.textContent = "Protectiveness: " + data[i].protectiveness;
        trainability.textContent = "Trainability: " + data[i].trainability;
    }

    function saveBreedAttributes() {

    }

    function initData() {

    }

    function renderBreedAtrributes() {

    }

    breedAttributes.addEventListener('click', function(event) {
        var element = event.target;
        if (element.matches(data[i].name) === true) {
            
        }
    })    
});

// EVENT LISTENERS

// BREED INFO




// 1. Store data from API into local storage

// 2. Parse data from local storage into breed selection list 
