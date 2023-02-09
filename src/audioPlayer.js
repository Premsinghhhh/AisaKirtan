/* let currentTrackInd = 0;

function audioPlayer() {
  playCurrentTrack();
  $("#playlist li a").click(function(e) {
    e.preventDefault();
    currentTrackInd = $(this).parent().index();
    playCurrentTrack();
  });

  $("#audioPlayer")[0].addEventListener("ended", playNextTrack);
  const audio = document.querySelector('#audioPlayer');
  audio.controls = true;
}

function getTitleOfTrack(trackNum) {
  const ulElement = document.getElementById("playlist")
  return ulElement.getElementsByTagName("li")[trackNum].innerText;
}

function showTitleOfTrack() {
  const theTrackPlaying = getTitleOfTrack(currentTrackInd);
  const header = document.getElementsByClassName("main-title m-5")[0]
  const h2 = header.getElementsByTagName('h2') //there should only be 1 h2 in Header. No More //there should only be 1 h2 in Header. No More
  if (h2.length === 0) {
    const h2ForTrackName = document.createElement('h2');
    h2ForTrackName.innerText = theTrackPlaying
    header.appendChild(h2ForTrackName)
  } else {
    h2[0].innerText = theTrackPlaying
  }
}

function playNextTrack() {
  currentTrackInd++;
  if (currentTrackInd == $("#playlist li a").length) {
    currentTrackInd = 0;
  }
  playCurrentTrack();
}

function playPreviousTrack() {
  currentTrackInd--;
  if (currentTrackInd === -1) {
    currentTrackInd = $("#playlist li a").length - 1;
  }
  playCurrentTrack()
}

function playCurrentTrack() {
  $("#playlist li").removeClass("current-song");
  $("#playlist li:eq(" + currentTrackInd + ")").addClass("current-song");
  $("#audioPlayer")[0].src = $("#playlist li a")[currentTrackInd];
  $("#audioPlayer")[0].play();
  showTitleOfTrack();
  changeNavigator();
}

function changeNavigator() {
  console.log('Changed Navigator');
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: getTitleOfTrack(currentTrackInd),
      artist: document.getElementsByTagName('h1')[0].innertext,
      album: 'vaheguru jio',
      /* artwork: [{src: document.getElementsByClassName('main-image')[0].src}] */
   /*   artwork: [
        { src: document.getElementsByClassName('main-image')[0].src , sizes: '96x96', type: 'image/jpg' },
        { src: document.getElementsByClassName('main-image')[0].src , sizes: '128x128', type: 'image/jpg' },
        { src: document.getElementsByClassName('main-image')[0].src , sizes: '192x192', type: 'image/jpg' },
        { src: document.getElementsByClassName('main-image')[0].src , sizes: '256x256', type: 'image/jpg' },
        { src: document.getElementsByClassName('main-image')[0].src , sizes: '384x384', type: 'image/jpg' },
        { src: document.getElementsByClassName('main-image')[0].src , sizes: '512x512', type: 'image/jpg' },
      ]
    })
    navigator.mediaSession.setActionHandler('previoustrack', () => playPreviousTrack())
    navigator.mediaSession.setActionHandler('nexttrack', () => playNextTrack())
    navigator.mediaSession.setActionHandler('play', () => $("#audioPlayer")[0].play())
    navigator.mediaSession.setActionHandler('pause', () => $("#audioPlayer")[0].pause())
  } else {
    console.log('mediaSession Not Found')
  }
}  */
*/


// Get references to the audio player and playlist
var audioPlayer = document.getElementById("audioPlayer");
var playlist = document.getElementById("playlist");

// Load the first track when the page loads
window.onload = function() {
  audioPlayer.src = playlist.firstElementChild.firstElementChild.getAttribute("href");
  audioPlayer.load();
}

// Play the previous track
function playPreviousTrack() {
  var currentTrack = playlist.querySelector("li a[href='" + audioPlayer.src + "']");
  var previousTrack = currentTrack.parentElement.previousElementSibling;

  if (previousTrack === null) {
    previousTrack = playlist.lastElementChild;
  }

  audioPlayer.src = previousTrack.firstElementChild.getAttribute("href");
  audioPlayer.load();
  audioPlayer.play();
}

// Play the next track
function playNextTrack() {
  var currentTrack = playlist.querySelector("li a[href='" + audioPlayer.src + "']");
  var nextTrack = currentTrack.parentElement.nextElementSibling;
}
