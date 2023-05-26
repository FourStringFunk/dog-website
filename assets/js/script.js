var breedUrl = "https://dogapi.dog/api/v2/breeds"
var factsUrl = "https://dogapi.dog/api/v2/facts"

//fetch(breedUrl)
//.then(function (response) {
 //   return response.json();
//  })
 // .then(function (data) {
//    console.log(data);
//  });

const factEl = document.getElementById("fact")
 
fetch(factsUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    factEl.textContent = data.data[0].attributes.body
  });

  