const apiKEY = "5Ng5KCn+rvjkpNagvsh0Cg==iqEQFjzT9ajCB9np";
const request = "https://api.api-ninjas.com/v1/dogs?shedding=3&barking=3&energy=3";
var factURL = "https://dogapi.dog/api/v2/facts";

// Section Elements
var breedList = document.getElementById('breedSelection');
var breedInfoSection = document.getElementById('d-none');
var breedFacts = document.getElementById('breedDescription');
const factEl = document.getElementById('fact');

// STAT Elements
var minHF = document.getElementById('minHF');
var maxHF = document.getElementById('maxHF');
var minWF = document.getElementById('minWF');
var maxWF = document.getElementById('maxWF');
var minHM = document.getElementById('minHM');
var maxHM = document.getElementById('maxHM');
var minWM = document.getElementById('minWM');
var maxWM = document.getElementById('maxWM');
var breedName = document.getElementById('breedName');
var minLife = document.getElementById('minL');
var maxLife = document.getElementById('maxL');
var shedding = document.getElementById('shedding');
var barking = document.getElementById('barking');
var energy = document.getElementById('energy');
var protectiveness = document.getElementById('protectiveness');
var trainability = document.getElementById('trainability');

var breedBtn = document.querySelectorAll('.breed');

var target;

var factArray;
var statArray;

// Fetch request for SELECT YOUR BREED and BREED FACTS

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
      // Creates new list items based on breed name, applies the class breed, and appends breed names as list items.
      for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('li');
          listItem.setAttribute('class', 'breed btn');
          listItem.setAttribute('id', data[i].name);
          listItem.textContent = data[i].name;
          breedList.appendChild(listItem);
      }

      // On click, calls the function setStats to each of the breed name buttons built above
      breedList.addEventListener("click", function(event) {
        target = event.target.id;
        setStats();
      });

      // changes the breed stats depending on the breed name button clicked.
      function setStats() {
        for (var i = 0; i < data.length; i++) {
          if(data[i].name === target)
          {
            breedName.textContent = data[i].name;
            minLife.textContent = "Max Life Expectancy: " + data[i].min_life_expectancy + " years";
            maxLife.textContent = "Minimum Life Expectancy: " + data[i].max_life_expectancy + " years";
            minHF.textContent = "Min Height: " + data[i].min_height_female + " inches";
            maxHF.textContent = "Max Height: " + data[i].max_height_female + " inches";
            minWF.textContent = "Min Weight: " + data[i].min_weight_female + " lbs";
            maxWF.textContent = "Max Weight: " + data[i].max_weight_female + " lbs";
            minHM.textContent = "Mind Height: " + data[i].min_height_male + " inches"; 
            maxHM.textContent = "Max Height: " + data[i].max_height_male + " inches";
            minWM.textContent = "Min Weight: " + data[i].min_weight_male + " lbs";
            maxWM.textContent = "Max Weight: " + data[i].max_weight_male + " lbs";
            shedding.textContent = "Shedding: " + data[i].shedding;
            barking.textContent = "Barking: " + data[i].barking;
            energy.textContent = "Energy: " + data[i].energy;
            protectiveness.textContent = "Protectiveness: " + data[i].protectiveness;
            trainability.textContent = "Trainability: " + data[i].trainability;
          }
        }
      } 
  });

  fetch(factURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    factEl.innerHTML = data.data[0].attributes.body;
  });
