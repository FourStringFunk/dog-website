fetch("https://dogapi.dog/api/v2/breeds")
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });