var breedUrl = "https://dogapi.dog/api/v2/breeds";
var factsUrl = "https://dogapi.dog/api/v2/facts";

const factEl = document.getElementById("fact");

const imgs = document.getElementsByClassName("img");
 
fetch(factsUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    factEl.textContent = data.data[0].attributes.body
  });

const apiKEY = "5Ng5KCn+rvjkpNagvsh0Cg==iqEQFjzT9ajCB9np";
const request = "https://api.api-ninjas.com/v1/dogs?shedding=3&barking=3&energy=3";

fetch(request, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKEY
  }
})
.then(function(response) {
  return response.json();
})
.then(function(data) {

  console.log(data);
  let random1 = Math.floor(Math.random() * 20);
  let random2;
  do {
    random2 = Math.floor(Math.random() * 20);
  } while (random2 === random1);


  imgs[0].setAttribute("src", data[random1].image_link);
  imgs[0].setAttribute("alt", data[random1].name);
  imgs[1].setAttribute("src", data[random2].image_link);
  imgs[1].setAttribute("alt", data[random2].name);
})

  