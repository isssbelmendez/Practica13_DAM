//Arreglo de canciones con informacion como titulo,artista, ruta de archivo y portada
const songs =[
    {title: 'Urbano', artist: 'Beachy', src:'music/cancion1.mp3', cover:'img/cover1.jpg'},
    {title: 'Pop', artist: 'Te espere', src:'music/cancion2.mp3', cover:'img/cover2.jpg'},
    {title: 'Hip-hop/rap', artist: 'Entender', src:'music/cancion3.mp3', cover:'img/cover3.jpg'},
    {title: 'Urbano', artist: 'Coco', src:'music/cancion4.mp3', cover:'img/cover4.jpg'},
    {title: 'Urbano', artist: 'Hechizo', src:'music/cancion5.mp3', cover:'img/cover5.jpg'},
    
];

//indice de la cancion actual en repdroduccion
let currentSongIndex = 0;

//Variable para rastrear si la música está reproduciéndose o no
let isPlaying = false;

//Objeto que representa la instancia de reprodcucción de audio usando la biblioteca Howler.js
let audio;

//Función para cargar y reproducir la canción actual
function playCurrentSong(){
    if (audio) {
        audio.stop();
    }

    //Crea una nueva instancia de reproducción de audio con la canción actual
    audio = new Howl({
        src: [songs[currentSongIndex].src],
        autoplay: isPlaying, //Reproduce automáticamente si la música está en reproducción
        volume: volumeSlider.value, //Establece el volumen inicial
        onend: function(){
            //Cuando la canción actual termina, reproduce la siguiente
            playNextSong();
        }
    });
    // Actualiza la infromación de la canción en la interfaz
    updateSongInfo();
}

//Elementos de la interfaz obtenidos pior su ID
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const volumeSlider = document.getElementById('volume');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const albumCover = document.querySelector('.card-img-top');

//Evento para el botón de reproducción
playButton.addEventListener('click', () => {
    isPlaying = true; //Se establece el estado de reproducción
    playCurrentSong(); //Llama a la funcion para reproducir la cancion actual
});

//Evento para el boton de pausa
pauseButton.addEventListener('click', () => {
    isPlaying = false; //Se establece el estado de no reproduccion
    audio.pause(); //Pausa la reproduccion de audio
});

//Evento para el boton siguiente cancion
nextButton.addEventListener('click', () =>{
    playNextSong(); //Llama a la funcion para reproducir la siguiente cancion
});

//Evento para el boton de cancion anterior
prevButton.addEventListener('click', () => {
    //Si la reproduccion actual esta mas alla de los primeros 5 segundos, reinicia la cancion
    if (audio.seek() > 5) {
        audio.seek(0);

    } else {
        //Si no, cambia a la cancion anterior y la reproduce
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playCurrentSong();
    }
 });
    
//Evento para el deslizador de volumen
volumeSlider.addEventListener('input', () => {
    //Actualiza el volumen durante el deslizamiento
    audio.volume(volumeSlider.value);
});

//Funcion para actualizar la informacion de la cancion actual en la interfaz
function updateSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    songArtist.textContent = songs[currentSongIndex].artist;
    albumCover.src = songs[currentSongIndex].cover;
}

//Funcion para reproducir la siguiente cancion
function playNextSong(){
    currentSongIndex = (currentSongIndex + 1) % songs.length; //Cambia a la siguiente cancion en el ciclo
    playCurrentSong();//Llama a la funcion para reproducir la nueva cancion
}

//eproduce la primera cancion al cargar la pagina
playCurrentSong();



