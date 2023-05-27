$(function() {
  var url = 'https://bootcamp-apiproxy.herokuapp.com/token/72b8b6de-0089-4257-a4b4-02d655ad67f6';

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
        })
    });
});