
const mybtn = document.getElementById('myList');
const tre = document.getElementById('btn');
tre.addEventListener("click", openmenu);
function openmenu() {
    if (mybtn.style.display != 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}

// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = L.map('map1').setView([39.732, -103.228], 4);
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
const tiles = L.tileLayer(tileURL, { attribution })

async function show_me() {
    // Get place each time the function is triggered, or you can't change the search value
    let place = document.getElementById("searchbar").value;
    // Get breweries for the users place
    let response = await fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${place}&by_country=United%20States&per_page=200`);
    let data = await response.json();
    console.log(data);
    data.forEach(element => {
        console.log(element);
        // No lat or lon, bail
        if (element.latitude == null || element.longitude == null) return;
        let marker = L.marker([element.latitude, element.longitude]).addTo(map);
        marker.bindPopup(`<b>${element.name}</b><br>${element.address_1}, ${element.city}, ${element.state_province}<br>Phone no. ${element.phone}<br><a href="${element.website_url}">Website</a>`).openPopup();
    });
}
