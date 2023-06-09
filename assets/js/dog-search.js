// Global Variables
var url = 'https://bootcamp-apiproxy.herokuapp.com/token/72b8b6de-0089-4257-a4b4-02d655ad67f6';
var page = 1;
var maxPages;
var loadingImg = document.getElementById("loading-img");


// function to handle the selection and re-display of cards based on on age, gender, and size filter selections
$(function() {
 var pages = document.getElementsByClassName("page-link");
 var filterBtn = document.getElementById("filterBtn"); 

filterBtn.onclick = filter; // filters cards based onclick selection of filter dropdown items

 Array.from(pages).forEach(function (element) {
   element.addEventListener("click", changePage);
 });
 generateCards(page);
});

function filter() { 
  generateCards(page);
}


function changePage(event){

 if(event.target.innerText === "Next"){
   if(page !== maxPages) {
     page++;
     generateCards(page);
   }
 }
 else if(event.target.innerText === "Previous") {
   if(page !== 1) {
     page--;
     generateCards(page);
   }
 }
 else {
   if(event.target.innerText !== page) {
     page = Number(event.target.innerText);
     generateCards(page);
   }
 }
}

function generateCards(p) {
 let qParams = Array.from(document.getElementsByClassName("form-select"));
 let qItems = [];


 for (let i = 0; i < qParams.length; i++) {
   if(qParams[i].value !== "none") {
     let parameter = qParams[i].id;
     let value = qParams[i].value;
     let qUrl = `&${parameter}=${value}`;
     qItems.push(qUrl);
   }
 }
 let finalQuery = qItems.join("");
 console.log(finalQuery);

 const node = document.getElementById("card-container").lastElementChild;

//fetch to get token to use PetFinder API
 fetch(url)
   .then(function(response) {
     return response.json();
   })
   .then(function(data) {
     let petUrl = `https://api.petfinder.com/v2/animals?type=dog&page=${p}` + finalQuery;

      //fetch to get data from PetFrinder API
     fetch(petUrl, {
       headers: {
         Authorization: ` Bearer ${data.access_token}`}
       })
       .then(function(res) {
         return res.json();
       })
       .then(function(d) {
         maxPages = d.pagination.total_pages;
         for (var i = 0; i < d.animals.length; i++ ) {
           var clone = node.cloneNode(true);
           document.getElementById("card-container").appendChild(clone); // used for creating multiple cards and filling the card container
         }
        //--------- appends specific data to the cards---------------
         var imgEl = document.getElementsByClassName("card-img");
         var nameEl = document.getElementsByClassName("dogname");
         var ageEl = document.getElementsByClassName("ageBreeds");
         var aboutEl = document.getElementsByClassName("about");
         var btnEl = document.getElementsByClassName("learn-more");
         
         for (let i = 0; i < d.animals.length; i++ ) {

          //--removes dog names that are numerical
           if (isNaN(d.animals[i].name)) { 
             nameEl[i].innerText = d.animals[i].name;
             ageEl[i].innerText = d.animals[i].age +" | "+ d.animals[i].breeds.primary;
           if(d.animals[i].description !== null) { 

            //--removes descriptions that have special characters
             let desc = d.animals[i].description;
             let filterDesc = desc.match(/[abcdefghijklmnopqrstuvwxyz.,'"!?$@() ]/gi);
             let newDescription = filterDesc.join("");
             aboutEl[i].innerText = newDescription;
           }
           if (d.animals[i].photos.length !== 0) {
             imgEl[i].src=d.animals[i].photos[0].medium;
           }}

           //calls button with the id of PetFinder API
           btnEl[i].setAttribute("id", d.animals[i].id);
         }
         //adds loading image while page loads
         loadingImg.setAttribute("class", "d-none");

         // removes the last child card template
         document.getElementById("card-container").lastElementChild.setAttribute("class", "d-none"); 
       })
  });
  updatePagination();

}
function toPageAdopt(element){
 console.log(element);
 localStorage.setItem("saved-id", element.getAttribute("id")); // based on dog-id, sends to adoptable.html page.
 window.location.replace("../pages/adoptable.html");
}

//---------------Pagination to navigate between pages
function updatePagination() {
 var pageNumbers = document.getElementsByClassName("page-number");
 if(page >= 2 && page <= maxPages - 2) {
   pageNumbers[0].innerText = page - 1;
   pageNumbers[1].innerText = page;
   pageNumbers[2].innerText = page + 1;
 }
 for (let i = 0; i < pageNumbers.length; i++) {
   if(pageNumbers[i].innerText == page) {
     pageNumbers[i].parentElement.setAttribute("class", "page-item active");
   }
   else {
     pageNumbers[i].parentElement.setAttribute("class", "page-item");
   }
 }
}
