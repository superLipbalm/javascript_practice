const container = document.querySelector('.container');
const movie = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat');
const count = document.querySelector('#count');
const total = document.querySelector('#total');

function checkClass(element){
    return !element.classList.contains('occupied') && element.classList.contains('seat');
}

function totalSummary(){
    const seatCount = updateSelectedCount();
    const totalValue = seatCount * movie.value;

    count.innerText = seatCount;
    total.innerText = totalValue;

    saveSelectedMovie();
}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    return selectedSeats.length;
}

function saveSelectedMovie(){
    const selectedMovie = movie.selectedIndex;
    localStorage.setItem('selectedMovie', selectedMovie);
}

function loadSelectedSeats(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    movie.selectedIndex = localStorage.getItem('selectedMovie');

    selectedSeats.forEach(index => seats.item(index).classList.add('selected'));

    totalSummary();
}

loadSelectedSeats();

container.addEventListener('click', function (e) {
    const element = e.target;

    if(checkClass(element)){
        element.classList.toggle('selected');
    }

    totalSummary();
})
