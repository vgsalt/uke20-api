
const mybtn = document.getElementById('myList');
const tre = document.getElementById('btn');
tre.addEventListener("click", openmenu );
function openmenu() {
    if(mybtn.style.display != 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}