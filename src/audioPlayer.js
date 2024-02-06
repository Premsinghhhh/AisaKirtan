let currentTrackInd = 0

function audioPlayer() {
  playCurrentTrack()
  $('#playlist li a').click(function(e) {
    e.preventDefault()
    currentTrackInd = $(this).parent().index()
    playCurrentTrack()
  })

  $('#audioPlayer')[0].addEventListener('ended', playNextTrack)
  const audio = document.querySelector('#audioPlayer')
  audio.controls = true
}

function getTitleOfTrack(trackNum) {
  const ulElement = document.getElementById('playlist')
  return ulElement.getElementsByTagName('li')[trackNum].innerText
}

function showTitleOfTrack() {
  const theTrackPlaying = getTitleOfTrack(currentTrackInd)
  const header = document.getElementsByClassName('main-title m-5')[0]
  const h2 = header.getElementsByTagName('h2') //there should only be 1 h2 in Header. No More //there should only be 1 h2 in Header. No More
  if (h2.length === 0) {
    const h2ForTrackName = document.createElement('h2')
    h2ForTrackName.innerText = theTrackPlaying
    header.appendChild(h2ForTrackName)
  } else {
    h2[0].innerText = theTrackPlaying
  }
}

function playNextTrack() {
  currentTrackInd++
  if (currentTrackInd == $('#playlist li a').length) {
    currentTrackInd = 0
  }
  playCurrentTrack()
}

function playPreviousTrack() {
  currentTrackInd--
  if (currentTrackInd === -1) {
    currentTrackInd = $('#playlist li a').length - 1
  }
  playCurrentTrack()
}

function playCurrentTrack() {
  $('#playlist li').removeClass('current-song')
  $('#playlist li:eq(' + currentTrackInd + ')').addClass('current-song')
  $('#audioPlayer')[0].src = $('#playlist li a')[currentTrackInd].href
  $('#audioPlayer')[0].play()
  showTitleOfTrack()
  changeNavigator()
}

function changeNavigator() {
  console.log('Changed Navigator')
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: getTitleOfTrack(currentTrackInd),
      artist: document.getElementsByTagName('h1')[0].innertext,
      album: 'vaheguru jio',
      /* artwork: [{src: document.getElementsByClassName('main-image')[0].src}] */
      artwork: [
        {
          src: document.getElementsByClassName('main-image')[0].src,
          sizes: '96x96',
          type: 'image/jpg',
        },
        {
          src: document.getElementsByClassName('main-image')[0].src,
          sizes: '128x128',
          type: 'image/jpg',
        },
        {
          src: document.getElementsByClassName('main-image')[0].src,
          sizes: '192x192',
          type: 'image/jpg',
        },
        {
          src: document.getElementsByClassName('main-image')[0].src,
          sizes: '256x256',
          type: 'image/jpg',
        },
        {
          src: document.getElementsByClassName('main-image')[0].src,
          sizes: '384x384',
          type: 'image/jpg',
        },
        {
          src: document.getElementsByClassName('main-image')[0].src,
          sizes: '512x512',
          type: 'image/jpg',
        },
      ],
    })
    navigator.mediaSession.setActionHandler('previoustrack', () =>
      playPreviousTrack(),
    )
    navigator.mediaSession.setActionHandler('nexttrack', () => playNextTrack())
    navigator.mediaSession.setActionHandler('play', () =>
      $('#audioPlayer')[0].play(),
    )
    navigator.mediaSession.setActionHandler('pause', () =>
      $('#audioPlayer')[0].pause(),
    )
  } else {
    console.log('mediaSession Not Found')
  }
}

function add_links_to_screen(trackLinks, gurmukhiTitle, englishTitle) {
  const ul = document.getElementById('playlist')
  for (let i = 0; i < trackLinks.length; i++) {
    const li = document.createElement('li')
    li.classList.add('m-3')

    const trackTitle = `<h4>${gurmukhiTitle[i]}<br>${englishTitle[i]}</h4>`
    const link = trackLinks[i]
    li.innerHTML = `<a href="${link}">${trackTitle}</a>`
    ul.appendChild(li)
    // <li class="m-3"><a href="https://docs.google.com/uc?export=download&id=19kZPdii658ZJRhjlFHlF2H6yMS1bqRYy"><h4> ਅੰਮ੍ਰਿਤਬਾਣੀਹਰਿਹਰਿਤੇਰੀ॥Amrit Baani Har Har </h4> </a></li>
  }
}

function add_links_to_screen_for_smgs(tracks) {
  for (let i = 0; i < tracks.length; i++) {
    const ul = document.getElementById(`playlist${i + 1}`)
    for (let j = 0; j < tracks[i].links.length; j++) {
      const li = document.createElement('li')
      li.classList.add('m-3')

      const trackTitle = `<h4>${tracks[i].keertanis[j]}</h4>`
      const link = tracks[i].links[j]
      li.innerHTML = `<a href="${link}">${trackTitle}</a>`
      ul.appendChild(li)
    }
  }
}
