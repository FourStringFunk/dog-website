//----------------------------------------Declarations------------------------------------------------
const savedId = localStorage.getItem("saved-id");
let n = document.getElementsByClassName("name");
let stat = document.getElementById("status");
let age = document.getElementById("age");
let gender = document.getElementById("gender");
let breed = document.getElementById("breed");
let coat = document.getElementById("coat");
let primary = document.getElementById("primary-color");
let secondary = document.getElementById("secondary-color");
let tertiary = document.getElementById("tertiary-color");
let description = document.getElementById("description");
let childrenSafe = document.getElementById("children");
let catSafe = document.getElementById("cats");
let dogSafe = document.getElementById("dogs");
let tags = document.getElementById("tags");
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
//---------------------------------------------------------------------------------------------------
$(function() {
  var url = 'https://bootcamp-apiproxy.herokuapp.com/token/72b8b6de-0089-4257-a4b4-02d655ad67f6';

  // If no id is saved in local storage, don't generate anything. Otherwise continue to generate for the specific dog selected
  if(savedId === null)
  {
    console.log("No ID saved");
  }
  else {
    console.log("The saved ID is: " + savedId);

    // First fetch get token to use petfinders api
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let petUrl = `https://api.petfinder.com/v2/animals/${savedId}`;

      // Second fetch gets the data from the specific dog selected
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

          // The third fetch, get more information the second fetch doesn't provide
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

              // Get and set all information needed from third fetch to the contact section
              evalText(r.organization.name, businessName);
              let e = r.organization.email;
              if(e !== null)
                setHref(e, email, "mailto");
              let p = r.organization.phone;
              if(p !== null)
                setHref(p, phone, "tel:");
              setBusinessHours(r.organization.hours, businessHours);
              setSocialMedia(r.organization.social_media, socialMedia);
              //-----------------------------------------------------------------------------
            });

          // Display images sent with API request if any
          for (let i = 0; i < d.animal.photos.length; i++) {
            let imgEl = document.createElement("img");
            imgEl.setAttribute("src", d.animal.photos[i].large);
            images.appendChild(imgEl);
          }
          //--------------------------------------------

          // Get and set animal details to detail section
          evalText(d.animal.name, n[0]);
          evalText(d.animal.name, n[1]);
          evalText(d.animal.status, stat);
          evalText(d.animal.age, age);
          evalText(d.animal.gender, gender);
          evalText(d.animal.coat, coat);
          evalText(d.animal.colors.primary, primary);
          evalText(d.animal.colors.secondary, secondary);
          evalText(d.animal.colors.tertiary, tertiary);
          yesOrNo(d.animal.environment.cats, catSafe);
          yesOrNo(d.animal.environment.children, childrenSafe);
          yesOrNo(d.animal.environment.dogs, dogSafe);
          setTags(d.animal.tags, tags);
          //---------------------------------------------

          //---------------------Specific getting and setting-------------------------------
          if(d.animal.breeds.primary !== null && d.animal.breeds.secondary !== null)
            breed.innerText = d.animal.breeds.primary + " and " + d.animal.breeds.secondary;
          else
            evalText(d.animal.breeds.primary, breed);

          if(d.animal.description !== null)
          {
            let des = d.animal.description;
            let filterDescription = des.match(/[abcdefghijklmnopqrstuvwxyz.,'"!?$()@ ]/gi);
            let newDescription = filterDescription.join("");
            evalText(newDescription, description);
          }
          //--------------------------------------------------------------------------------

          //--------Get and set health / training section-----------------
          setButtons(d.animal.attributes.spayed_neutered, spayedNeutered);
          setButtons(d.animal.attributes.house_trained, houseTrained);
          setButtons(d.animal.attributes.special_needs, specialNeeds);
          setButtons(d.animal.attributes.shots_current, shotsCurrent);
          //--------------------------------------------------------------
        })
    });
  }
});

//------------Get and set for buttons----------------
function setButtons(data, element) {
  if(data)
    element.setAttribute("class", "btn btn-primary");
}
//---------------------------------------------------

// Get and set for great with section
function yesOrNo(data, element) {
  if(data !== null)
    if(data === true)
      element.innerText = "Yes";
    else
      element.innerText = "No";
  else
    element.innerText = "Unknown";
}
//-----------------------------------

// Hide content if data is null, if not, display it
function evalText(data, element) {
  if(data === null)
    element.setAttribute("class", "d-none"); 
  else
    element.innerText = data;
}
//-------------------------------------------------

//--Get and set tags for notable adjectives---
function setTags(data, element) {
  for (let i = 0; i < data.length; i++) {
    let listEl = document.createElement("li");
    listEl.innerText = data[i];
    element.appendChild(listEl);
  }
}
//--------------------------------------------

// Used to add specific characters to a tag. E.g (mailto:, tel:)
function setHref(data, element, additives) {
  let aElement = document.createElement("a");
  element.appendChild(aElement);
  element.lastChild.setAttribute("href", additives + data);
  element.lastChild.innerText = data;
}
//--------------------------------------------------------------

//--------------Get and set location address for organization-----------------------
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
//-----------------------------------------------------------------------------------

//---------Display business hours if every day has content----------
function setBusinessHours(data, element) {
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
  }
}
//-------------------------------------------------------------------

//--------------------Get and set links if any--------------------------
function setSocialMedia(data, element) {
  if(data.facebook !== null)
    element.children[0].children[0].setAttribute("href", data.facebook);

  if(data.twitter !== null)
    element.children[1].children[0].setAttribute("href", data.twitter);

  if(data.instagram !== null)
    element.children[2].children[0].setAttribute("href", data.instagram);

  if(data.youtube !== null)
    element.children[3].children[0].setAttribute("href", data.facebook);
}
//-----------------------------------------------------------------------