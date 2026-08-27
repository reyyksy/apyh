const openingScreen = document.getElementById("opening-screen");
const openButton = document.getElementById("open-button");
const birthdayPage = document.getElementById("birthday-page");
const musicControl = document.getElementById("music-control");
const musicButton = document.getElementById("music-button");
const musicLabel = document.getElementById("music-label");
const birthdaySong = document.getElementById("birthday-song");
const photoGrid = document.querySelector(".photo-grid");
const photos = document.querySelectorAll(".photo img");
const body = document.body;

body.classList.add("opening-active");

function updateMusicControl(isPlaying) {
  musicLabel.textContent = isPlaying ? "pause" : "musik";
  musicButton.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
  musicButton.setAttribute("aria-pressed", String(isPlaying));
}

function playBirthdaySong() {
  const playAttempt = birthdaySong.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      updateMusicControl(false);
    });
  }
}

function showBirthdayPage() {
  if (openingScreen.hidden) {
    return;
  }

  openButton.disabled = true;
  window.scrollTo(0, 0);
  body.classList.remove("opening-active");
  openingScreen.classList.add("is-closing");

  window.setTimeout(() => {
    openingScreen.hidden = true;
    birthdayPage.hidden = false;
    birthdayPage.classList.add("is-visible");
    musicControl.hidden = false;
    window.scrollTo(0, 0);
    playBirthdaySong();
  }, 450);
}

photos.forEach((photo) => {
  photo.addEventListener("error", () => {
    photo.closest(".photo").hidden = true;

    if (![...photos].some((item) => !item.closest(".photo").hidden)) {
      photoGrid.hidden = true;
    }
  });
});

openButton.addEventListener("click", showBirthdayPage);

musicButton.addEventListener("click", () => {
  if (birthdaySong.paused) {
    playBirthdaySong();
  } else {
    birthdaySong.pause();
  }
});

birthdaySong.addEventListener("play", () => updateMusicControl(true));
birthdaySong.addEventListener("pause", () => updateMusicControl(false));
birthdaySong.addEventListener("error", () => {
  updateMusicControl(false);
  musicLabel.textContent = "musik tidak tersedia";
  musicButton.disabled = true;
});

updateMusicControl(false);
