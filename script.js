function formatNumber(num) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
}

var lagu = [
  ['Sorai', 'Nadin Amizah', 470000, 802000, 'Sorai.mp4', 'Sorai.jpeg', 'Sorai - Nadin Amizah.mp3', 'Untuk Dunia, Cinta, dan Kotornya'],
  ['Taruh', 'Nadin Amizah', 701000, 1200000, 'Taruh.mp4', 'Taruh.jpeg', 'Taruh - Nadin Amizah.mp3', 'Selamat Ulang Tahun'],
  ['dan, selesai', 'Nadin Amizah', 900000, 1000000, 'CanvasDownloader_Nadin_Amizah_1747559617932.mp4', 'dan,selesai.jpeg', 'dan, selesai. - Nadin Amizah.mp3', 'Kalah Bertaruh']
];

var container = document.getElementById("container");
var audioPlayer = document.getElementById("audio-player");
var currentlyPlayingButton = null;

lagu.forEach(function (item, index) {
  var [title, artist, likes, views, videoSrc, coverImg, audioSrc, description] = item;

  var card = document.createElement('div');
  card.className = 'playlist-card';

  var element = `
    <div class="video-bg">
      <video autoplay muted loop>
        <source src="${videoSrc}" type="video/mp4">
      </video>
    </div>

    <div class="playlist-content">
      <div class="playlist-header">
        <img src="${coverImg}" class="album-cover" alt="Album Cover" />
        <div class="playlist-text">
          <h2 class="playlist-title">${title}</h2>
          <div class="playlist-subtitle">Album • ${artist}</div>
        </div>
      </div>

      <div class="playlist-info">
        <p class="playlist-description">${description}</p>
        <div class="playlist-song">${title} - ${artist}</div>
      </div>

      <div class="playlist-actions">
        <div class="stats-group">
          <div class="stat-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${formatNumber(likes)} Likes</span>
          </div>
          <div class="stat-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>${formatNumber(views)} Views</span>
          </div>
        </div>
        <div class="button-group">
          <button class="action-button">+</button>
          <button class="play-button" data-audio="${audioSrc}">▶</button>
        </div>
      </div>
    </div>
  `;

  card.innerHTML = element;
  container.appendChild(card);
});

let currentAudioSrc = null;

document.querySelectorAll('.play-button').forEach(button => {
  button.addEventListener('click', function () {
    const newAudioSrc = this.getAttribute('data-audio');

    if (currentAudioSrc !== newAudioSrc) {
      audioPlayer.src = newAudioSrc;
      audioPlayer.play();
      currentAudioSrc = newAudioSrc;

      if (currentlyPlayingButton && currentlyPlayingButton !== this) {
        currentlyPlayingButton.textContent = '▶';
      }

      this.textContent = '❚❚';
      currentlyPlayingButton = this;

    } else {
      if (audioPlayer.paused) {
        audioPlayer.play();
        this.textContent = '❚❚';
      } else {
        audioPlayer.pause();
        this.textContent = '▶';
      }
    }
  });
});

audioPlayer.addEventListener('ended', () => {
  if (currentlyPlayingButton) {
    currentlyPlayingButton.textContent = '▶';
    currentlyPlayingButton = null;
    currentAudioSrc = null;
  }
});
