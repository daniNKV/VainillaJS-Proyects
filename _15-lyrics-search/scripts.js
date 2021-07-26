let DOM = {
    form : document.getElementById('form'),
    search : document.getElementById('search'),
    result : document.getElementById('result'),
    more : document.getElementById('more'),
}

const apiURL = 'https://api.lyrics.ovh';

// Buscar por canción o artista
async function searchSongs (term) {
   const res = await fetch(`${apiURL}/suggest/${term}`)
   const data = await res.json();
   console.log(data)
}



// Event Listeners

DOM.form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = DOM.search.value.trim();

    if (!searchTerm) {
        alert('Please type something')
    }else {
        searchSongs(searchTerm)
    }
});