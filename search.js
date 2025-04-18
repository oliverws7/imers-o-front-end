const resultArtist = document.getElementById("result-artist");
const searchInput = document.getElementById("search-input");
const artistImage = document.getElementById("artist-img");
const artistName = document.getElementById("artist-name");
const playlistContainer = document.getElementById("playlist-container");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((results) => displayResults(results))
    .catch((error) => console.error('There was a problem with the fetch operation:', error));
}

function displayResults(results) {
  hidePlaylists();
  if (results.length > 0) {
    const artist = results[0];
    artistImage.src = artist.urlImg;
    artistName.innerText = artist.name;
    resultArtist.classList.remove("hidden");
  } else {
    resultArtist.classList.add("hidden");
  }
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleInput = debounce(function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
}, 300);

searchInput.addEventListener("input", handleInput);