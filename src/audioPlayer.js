let currentTrackInd = 0
let current_title = ''
let larivaar = true

function playTrack(link) {
  document.getElementById('audioPlayer').src = link
  document.getElementById('audioPlayer').play()

  currentTrackInd = trackLinks.indexOf(link)
  current_title = getNameOfTrackFromLink(link)
  showTitleOfTrack()
  changeNavigator()
}

function getNameOfTrackFromLink(link) {
  let title = link.split('/').slice(-1)[0]
  title = title.replaceAll('.mp3', '')
  return decodeURIComponent(decodeURIComponent(title))
}

function showTitleOfTrack() {
  const header = document.getElementsByClassName('main-title m-5')[0]
  const h2 = header.getElementsByTagName('h2') //there should only be 1 h2 in Header. No More //there should only be 1 h2 in Header. No More

  if (h2.length === 0) {
    const h2ForTrackName = document.createElement('h2')
    h2ForTrackName.innerText = current_title
    header.appendChild(h2ForTrackName)
  } else {
    h2[0].innerText = ''
    if (typeof gurmukhiTitle !== 'undefined') {
      const gurmukhiTxt = gurmukhiTitle[currentTrackInd]
        ? gurmukhiTitle[currentTrackInd]
        : ''
      h2[0].innerHTML = `${gurmukhiTxt}<br>`
    }
    h2[0].innerText += current_title
  }
}

function playNextTrack() {
  currentTrackInd++
  if (currentTrackInd == trackLinks.length) {
    currentTrackInd = 0
  }

  playTrack(trackLinks[currentTrackInd])
}

function playPreviousTrack() {
  currentTrackInd--
  if (currentTrackInd === -1) {
    currentTrackInd = trackLinks.length - 1
  }

  playTrack(trackLinks[currentTrackInd])
}

function changeNavigator() {
  console.log('Changed Navigator')
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current_title,
      artist: document.getElementsByTagName('h1')[0].innertext,
      album: 'Aisa Kirtan',
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
      document.getElementById('audioPlayer').play(),
    )
    navigator.mediaSession.setActionHandler('pause', () =>
      document.getElementById('audioPlayer').pause(),
    )
  } else {
    console.log('mediaSession Not Found')
  }
}

function add_links_to_screen(trackLinks, gurmukhiTitle) {
  const ul = document.getElementById('playlist')
  ul.innerHTML = ''
  for (let i = 0; i < trackLinks.length; i++) {
    const li = document.createElement('li')
    li.classList.add('m-3')

    let gm = gurmukhiTitle[i] ? gurmukhiTitle[i] : ''
    if (larivaar && gm) {
      gm = gm.replaceAll(' ', '')
    }

    const link = trackLinks[i]
    const eng = getNameOfTrackFromLink(link)

    const trackTitle = `<h4>${gm}<br>${eng}</h4>`
    li.innerHTML = `<button class="trackBtn" onclick="playTrack('${link}')" >${trackTitle}</button>`
    ul.appendChild(li)
  }
}

function add_links_to_screen_for_smgs(tracks) {
  for (let i = 0; i < tracks.length; i++) {
    const ind = i ? i : '' //if i is 0, then playlistInd should be empty string
    const ul = document.getElementById(`playlist${ind}`)
    for (let j = 0; j < tracks[i].length; j++) {
      const li = document.createElement('li')
      li.classList.add('m-3')

      const link = tracks[i][j]
      const trackTitle = `<h4>${getNameOfTrackFromLink(link)}</h4>`

      li.innerHTML = `<button class="trackBtn" onclick="playTrack('${link}')" >${trackTitle}</button>`
      ul.appendChild(li)
    }
  }
}

function toggleLarivaar() {
  larivaar = !larivaar
  add_links_to_screen(trackLinks, gurmukhiTitle)
}
