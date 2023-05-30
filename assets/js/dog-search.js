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
          console.log(dataArray.animals.length);
          for (var i = 0; i < dataArray.animals.length; i++ ) {
            var clone = node.cloneNode(true);
            document.getElementById("card-container").appendChild(clone);
          }
          console.log(length);
          for (var i = 0; i < dataArray.animals.length; i++ ) {

            nameEl[i].innerText = dataArray.animals[i].name;
            ageEl[i].innerText = dataArray.animals[i].age +" | "+ dataArray.animals[i].breeds.primary;
            aboutEl[i].innerText = dataArray.animals[i].description;
            if (dataArray.animals[i].photos.length !== 0) {
              imgEl[i].src=dataArray.animals[i].photos[0].full;
            }
            btnEl[i].setAttribute("id", dataArray.animals[i].id);
          }
          document.getElementById("card-container").lastElementChild.setAttribute("class", "d-none");
        })
   });

  
});
function toPageAdopt(element){
  console.log(element);
  localStorage.setItem("saved-id", element.getAttribute("id"));
  window.location.replace("../pages/adoptable.html");
}
