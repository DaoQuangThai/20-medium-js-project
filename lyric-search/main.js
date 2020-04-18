const form = document.getElementById('form');
const search = document.getElementById('input');
const searchBtn = document.getElementById('btn');
const result = document.getElementById('result');
const moreBtn = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Crucial Part of this app
function showData(data) {
  const songList = data.data
    .map(song => {
      return `
      <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>
      `;
    })
    .join('');

  result.innerHTML = `
    <ul class="songs">${songList}</ul>
    `;

  if (data.prev || data.next) {
    const showNExtButton = data.next
      ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
      : '';
    const showPrevButton = data.prev
      ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
      : '';

    more.innerHTML = `${showPrevButton}${showNExtButton}`;
  } else {
    more.innerHTML = '';
  }
}

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Get lyrics
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/\n/g, '<br>');

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;
  }

  more.innerHTML = '';

  console.log(data);
}

// Event listener
form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});
