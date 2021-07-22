let DOM = {

    musicContainer : document.getElementById('music-container'),
   
    prevBtn : document.getElementById('prev'),
    nextBtn : document.getElementById('next'),
    playBtn : document.getElementById('play'),
    
    audio : document.getElementById('audio'),
    progress : document.getElementById('progress'),
    progressContainer : document.getElementById('progress-container'),
    title : document.getElementById('title'),
    cover : document.getElementById('cover'),

}


// Titulos de canciones

const songs = ['hey', 'summer', 'ukelele']

let songIndex = 2;

// Cargar datos de la cancion en el DOM

loadSong(songs[songIndex]);

// Actualizar detalles de la canción

function loadSong(song) {
    DOM.title.innerText = song;
    DOM.audio.src = `music/${song}.mp3`
    DOM.cover.src = `images/${song}.jpg`
}

// Elegir progreso
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}


// Reproducir
function playSong() {
    DOM.musicContainer.classList.add('play');
    DOM.playBtn.querySelector('i.fas').classList.remove('fa-play');
    DOM.playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function pauseSong() {
    DOM.musicContainer.classList.remove('play')
    DOM.playBtn.querySelector('i.fas').classList.add('fa-play');
    DOM.playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    } 

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    } 

    loadSong(songs[songIndex]);

    playSong();
}

// Actualizar barra de progreso
function updateProgress (e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration * 100);
    DOM.progress.style.width = `${progressPercent}%`
}

// Event Listeners
// Play
DOM.playBtn.addEventListener('click', () => {
    const isPlaying = DOM.musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    }else {
        playSong();
    }
})

// Cambiar cancion

DOM.prevBtn.addEventListener('click', prevSong);
DOM.nextBtn.addEventListener('click', nextSong);

// Actualizar progreso
DOM.audio.addEventListener('timeupdate', updateProgress);

// Click en la barra de progreso
DOM.progressContainer.addEventListener('click', setProgress);

// Termina la cancion
audio.addEventListener('ended', nextSong)