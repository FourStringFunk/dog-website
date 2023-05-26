const apiKEY = "5Ng5KCn+rvjkpNagvsh0Cg==iqEQFjzT9ajCB9np";
const request = "https://api.api-ninjas.com/v1/dogs?shedding=3&barking=3&energy=3";

var breedList = document.getElementById('breedSelect');

fetch(request, {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKEY,
    },
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.className = "breed";
        listItem.textContent = data[i].name;
        breedList.appendChild(listItem);
    }
});