$(function() {
  var url = 'https://bootcamp-apiproxy.herokuapp.com/token/72b8b6de-0089-4257-a4b4-02d655ad67f6';
  var dataArray;
  var imgEl = document.getElementsByClassName("card-img");
  var nameEl = document.getElementsByClassName("dogname");
  var ageEl = document.getElementsByClassName("ageBreeds");
  var aboutEl = document.getElementsByClassName("about");
  var btnEl = document.getElementsByClassName("btn");

  const node = document.getElementById("card-container").lastElementChild;
  

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let petUrl = 'https://api.petfinder.com/v2/animals?type=dog';
      fetch(petUrl, { 
        headers: { 
          Authorization: ` Bearer ${data.access_token}`} 
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(d) {
          console.log(d);
          dataArray = d;
          for (var i = 0; i < dataArray.animals.length; i++ ) {
            var clone = node.cloneNode(true);
            document.getElementById("card-container").appendChild(clone); // used for creating multiple cards and filling the card container
          }
          for (var i = 0; i < dataArray.animals.length; i++ ) {
            if (isNaN(dataArray.animals[i].name)) { //removes numerical names
              nameEl[i].innerText = dataArray.animals[i].name;
              ageEl[i].innerText = dataArray.animals[i].age +" | "+ dataArray.animals[i].breeds.primary;
            
            if(dataArray.animals[i].description !== null) { //removes descriptions that have special characters
              let desc = dataArray.animals[i].description;
              let filterDesc = desc.match(/[abcdefghijklmnopqrstuvwxyz.,'"!?$@() ]/gi); 
              let newDescription = filterDesc.join("");
              aboutEl[i].innerText = newDescription;
            }
            if (dataArray.animals[i].photos.length !== 0) {
              imgEl[i].src=dataArray.animals[i].photos[0].medium;
            

            }}// appends the data to the cards. 
            
            btnEl[i].setAttribute("id", dataArray.animals[i].id); // calls button with the id, which directs to adopt dogs.
          }
          document.getElementById("card-container").lastElementChild.setAttribute("class", "d-none"); // removes the last child template 
        })
   });
  
});
function toPageAdopt(element){
  console.log(element);
  localStorage.setItem("saved-id", element.getAttribute("id")); // based on dog-id, sends to new page.
  window.location.replace("../pages/adoptable.html");
}