// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = L.map('map1').setView([39.732, -103.228], 4);
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
const tiles = L.tileLayer(tileURL, { attribution })

async function addToList(element) {
    alert(element);
}

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
        let marker = L.marker([element.latitude, element.longitude]).addTo(map)
        // Ternary operators for phone number and website, cause sometimes they're missing
        element.phone = element.phone ? element.phone : "N/A";
        element.website_url = element.website_url ? element.website_url : "javascript:void(0)";
        marker.bindPopup(`<b>${element.name}</b><br>${element.address_1}, ${element.city}, ${element.state_province}<br>Phone no. ${element.phone}<br><a href="${element.website_url}">Website</a>`).openPopup();
        // Add to sidebar.
        const card = document.createElement('div');
        card.classList.add("card");
        card.id = `${element.id}`;
        card.innerHTML = `
            <h2>${element.name}</h2>
            <a href="${element.website_url}" target="_blank">Website</a>
            <p>📍 ${element.address_1}, ${element.city}, ${element.postal_code} ${element.state_province}</p>
            <p>📱 ${element.phone}</p>
            <button class="button" onclick="remove('${element.id}')">Remove</button>
            <button class="button addtolist" id="listbutton-${element.id}" onclick="addToList('${element.id}')">Add to list</button>
        `
        document.getElementById("sidebar_container").appendChild(card);
        // Because we have elements inside the sidebar, we can stop hiding it.
        document.getElementById("sidebar").classList.add("stop-hiding");
    });
}

function remove(id) {
    element = document.getElementById(id);
    element.remove();
}

function addToList(id) {
    element = document.getElementById(id);
    // Create card from the previous card
    const card = document.createElement('div');
    card.classList.add("card");
    card.id = `list-${id}`;
    card.innerHTML = element.innerHTML;
    // Remove old card
    const old_card = document.getElementById(`${id}`);
    old_card.remove();
    // Really add to the list
    document.getElementById("list_container").appendChild(card);
    // Remove add-to-list button
    const listbutton = document.getElementById(`listbutton-${id}`);
    listbutton.remove();
}
