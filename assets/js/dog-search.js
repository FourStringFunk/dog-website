// Global Variables
var url = 'https://bootcamp-apiproxy.herokuapp.com/token/72b8b6de-0089-4257-a4b4-02d655ad67f6';
var page = 1;
var maxPages;
var loadingImg = document.getElementById("loading-img");


$(function() {
 var pages = document.getElementsByClassName("page-link");
 var filterBtn = document.getElementById("filterBtn"); 
 console.log("Pages: " + pages);

filterBtn.onclick = filter; 

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


 console.log(p);
 const node = document.getElementById("card-container").lastElementChild;


 fetch(url)
   .then(function(response) {
     return response.json();
   })
   .then(function(data) {
     console.log(data);
     let petUrl = `https://api.petfinder.com/v2/animals?type=dog&page=${p}` + finalQuery;
     console.log(petUrl);
     fetch(petUrl, {
       headers: {
         Authorization: ` Bearer ${data.access_token}`}
       })
       .then(function(res) {
         return res.json();
       })
       .then(function(d) {
         console.log(d);
         maxPages = d.pagination.total_pages;
         for (var i = 0; i < d.animals.length; i++ ) {
           var clone = node.cloneNode(true);
           document.getElementById("card-container").appendChild(clone); // used for creating multiple cards and filling the card container
         }

         var imgEl = document.getElementsByClassName("card-img");
         var nameEl = document.getElementsByClassName("dogname");
         var ageEl = document.getElementsByClassName("ageBreeds");
         var aboutEl = document.getElementsByClassName("about");
         var btnEl = document.getElementsByClassName("learn-more");
         console.log(btnEl.length);
         //// appends the data to the cards.
         for (let i = 0; i < d.animals.length; i++ ) {
           if (isNaN(d.animals[i].name)) { //removes numerical names
             nameEl[i].innerText = d.animals[i].name;
             ageEl[i].innerText = d.animals[i].age +" | "+ d.animals[i].breeds.primary;
           if(d.animals[i].description !== null) { //removes descriptions that have special characters
             let desc = d.animals[i].description;
             let filterDesc = desc.match(/[abcdefghijklmnopqrstuvwxyz.,'"!?$@() ]/gi);
             let newDescription = filterDesc.join("");
             aboutEl[i].innerText = newDescription;
           }
           if (d.animals[i].photos.length !== 0) {
             imgEl[i].src=d.animals[i].photos[0].medium;
           }}

           btnEl[i].setAttribute("id", d.animals[i].id); // calls button with the id, which directs to adopt dogs.
         }
         loadingImg.setAttribute("class", "d-none");
         document.getElementById("card-container").lastElementChild.setAttribute("class", "d-none"); // removes the last child template
       })
  });
  updatePagination();

}
function toPageAdopt(element){
 console.log(element);
 localStorage.setItem("saved-id", element.getAttribute("id")); // based on dog-id, sends to new page.
 window.location.replace("../pages/adoptable.html");
}


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
