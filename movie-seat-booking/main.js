const theater = document.querySelector('.theater');
// Hay thiệt chứ có kiểu select này nữa hay sao, trước giờ hoàn toàn ko biết
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();

// Biết thêm 1 cái mới +tự động chuyển thành number
let ticketPrice = +movieSelect.value;

// Get data from localstorge and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Save selected movie index and price to local store
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update count and total
function updateSelectedCount() {
  const selectedSeat = document.querySelectorAll('.row .seat.selected');
  const selectedSeatQuantity = selectedSeat.length;

  // Get the index and save to local store
  const seatsIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // Update to the DOM
  count.innerHTML = selectedSeatQuantity;
  total.innerHTML = selectedSeatQuantity * ticketPrice;
}

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +movieSelect.value;

  // Selected index là một build in html in dom
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// Biết thêm 1 cái mới là chọn thằng cha và khi nào click vào cũng có thể chọn thằng con với e.target tốt hơn cho performance
theater.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  // Count selected && total
  updateSelectedCount();
});

// Very frist update for localstorge
updateSelectedCount();
