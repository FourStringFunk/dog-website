const savedId = localStorage.getItem("saved-id");
let n = document.getElementsByClassName("name");
let age = document.getElementById("age");
let breed = document.getElementById("breed");
let description = document.getElementById("description");
let spayedNeutered = document.getElementById("spayed-neutered");
let houseTrained = document.getElementById("house-trained");
let specialNeeds = document.getElementById("special-needs");
let shotsCurrent = document.getElementById("shots-current");
let images = document.getElementById("images");
let email = document.getElementById("email");
let businessName = document.getElementById("business-name");
let phone = document.getElementById("phone");
let mapsUrl = document.getElementById("google-maps");
let businessHours = document.getElementById("business-hours");
let socialMedia = document.getElementById("social-media");

$(function() {
  var url = 'https://bootcamp-apiproxy.herokuapp.com/token/72b8b6de-0089-4257-a4b4-02d655ad67f6';

  if(savedId === null)
  {
    console.log("No ID saved");
  }
  else {
    console.log("The saved ID is: " + savedId);
  }

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let petUrl = `https://api.petfinder.com/v2/animals/${savedId}`;
      fetch(petUrl, { 
        headers: { 
          Authorization: ` Bearer ${data.access_token}`
        } 
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(d) {
          console.log(d);
          let organizationUrl = `https://api.petfinder.com/v2/organizations/${d.animal.organization_id}`

          fetch(organizationUrl, {
            headers: {
              Authorization: ` Bearer ${data.access_token}`
            }
            })
            .then(function(resp) {
              return resp.json()
            })
            .then(function(r) {
              console.log(r);
              evalText(r.organization.name, businessName);
              let e = r.organization.email;
              if(e !== null)
                setHref(e, email, "mailto");
              let p = r.organization.phone;
              if(p !== null)
                setHref(p, phone, "tel:");
              setBusinessHours(r.organization.hours, businessHours);
              setSocialMedia(r.organization.social_media, socialMedia);
              //getDescription(r.organization, description, d.animal.name);
            });

          evalText(d.animal.name, n[0]);
          evalText(d.animal.name, n[1]);
          evalText(d.animal.age, age);

          if(d.animal.breeds.primary !== null && d.animal.breeds.secondary !== null)
            breed.innerText = d.animal.breeds.primary + " and " + d.animal.breeds.secondary;
          else
            evalText(d.animal.breeds.primary, breed);

          if(d.animal.description !== null)
            evalText(d.animal.description, description);

          if(d.animal.attributes.spayed_neutered)
            spayedNeutered.setAttribute("class", "btn btn-primary");

          if(d.animal.attributes.house_trained)
            houseTrained.setAttribute("class", "btn btn-primary");
          
          if(d.animal.attributes.special_needs)
            specialNeeds.setAttribute("class", "btn btn-primary");

          if(d.animal.attributes.shots_current)
            shotsCurrent.setAttribute("class", "btn btn-primary");

          for (let i = 0; i < d.animal.photos.length; i++) {
            let imgEl = document.createElement("img");
            imgEl.setAttribute("src", d.animal.photos[i].large);
            images.appendChild(imgEl);
            console.log(d.animal.photos.length);
          }
        })
    });
});

function evalText(data, element) {
  if(data === null)
    element.setAttribute("class", "d-none"); 
  else
    element.innerText = data;
}

function setHref(data, element, additives) {
  let aElement = document.createElement("a");
  element.appendChild(aElement);
  element.lastChild.setAttribute("href", additives + data);
  element.lastChild.innerText = data;
}

function setMapsUrl(data, element) {
  if(data.address1 !== null || 
    data.city !== null || 
    data.state !== null || 
    data.postcode !== null) {
      let url = "https://www.google.com/maps/place/";
      let aElement = document.createElement("a");
      element.appendChild(aElement);
      let address = `${data.address1}, ${data.city}, ${data.state} ${data.postcode}`;
      let addressQuery = address.replaceAll(" ", "+");
      element.lastChild.setAttribute("href", url + addressQuery);
      element.lastChild.innerText = address;
    }
}

function setBusinessHours(data, element) {
  console.log(data.monday);
  if(data.sunday !== null || 
    data.monday !== null || 
    data.tuesday !== null || 
    data.wednesday !== null || 
    data.thursday !== null || 
    data.friday !== null || 
    data.saturday !== null) {
      element.children[0].innerText = "Sunday: " + data.sunday;
      element.children[1].innerText = "Monday: " + data.monday;
      element.children[2].innerText = "Tuesday: " + data.tuesday;
      element.children[3].innerText = "Wednesday: " + data.wednesday;
      element.children[4].innerText = "Thursday: " + data.thursday;
      element.children[5].innerText = "Friday: " + data.friday;
      element.children[6].innerText = "Saturday: " + data.saturday;
    }
  else {
    element.parentElement.setAttribute("class", "d-none");
    console.log("Business hours incomplete");
  }
}

function setSocialMedia(data, element) {
  let child = element.children;
  if(data.facebook !== null)
    element.children[0].children[0].setAttribute("href", data.facebook);

  if(data.twitter !== null)
    element.children[1].children[0].setAttribute("href", data.twitter);

  if(data.instagram !== null)
    element.children[2].children[0].setAttribute("href", data.instagram);

  if(data.youtube !== null)
    element.children[3].children[0].setAttribute("href", data.facebook);
}

// function getDescription(data, element, animalName) {
//   let animal = String(animalName).toLowerCase(); 
//   let mainUrl = `https://www.petfinder.com/dog/${animal}-${savedId}/`;
//   let city = String(data.address.city).toLowerCase();
//   let state = String(data.address.state).toLowerCase();
//   let name = String(data.name).toLowerCase();
//   let cityUrl = city.replaceAll(" ", "-");
//   let nameUrl = name.replaceAll(" ", "-");
//   let id = String(data.id).toLowerCase();

//   let queryUrl = mainUrl + `${state}/${cityUrl}/${nameUrl}-${id}/`;

//   console.log(city);
//   console.log(state);
//   console.log(nameUrl);
//   console.log(id);

//   console.log(queryUrl);
// }