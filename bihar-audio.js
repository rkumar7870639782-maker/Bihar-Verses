/* ================================
   BiharVerse - Audio Controller
   Global music icon + Chhath/Diwali
   festival songs (mutually exclusive)
   ================================ */

document.addEventListener("DOMContentLoaded", function () {

  // ---- 1. Create audio elements ----
  const bgMusic = new Audio("assets/aaiye-na-hamra-bihar-me.mp3");
  bgMusic.loop = true;

  const chhathSong = new Audio("assets/chhath-geet.mp3");
  const diwaliSong = new Audio("assets/diwali-geet.mp3");

  const allAudios = [bgMusic, chhathSong, diwaliSong];

  function pauseOthers(current) {
    allAudios.forEach(a => {
      if (a !== current) a.pause();
    });
  }

  // ---- 2. Global floating music icon (next to dark/light toggle) ----
  const bgMusicBtn = document.getElementById("bgMusicBtn");

  if (bgMusicBtn) {
    bgMusicBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        pauseOthers(bgMusic);
        bgMusic.play().then(() => {
          bgMusicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          bgMusicBtn.classList.add("playing");
        }).catch(() => {
          bgMusicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        });
      } else {
        bgMusic.pause();
        bgMusicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        bgMusicBtn.classList.remove("playing");
      }
    });
  }

  function resetBgIcon() {
    if (bgMusicBtn) {
      bgMusicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
      bgMusicBtn.classList.remove("playing");
    }
  }

  // ---- 3. Chhath Puja festival card ----
  const chhathCard = document.getElementById("chhathCard");
  if (chhathCard) {
    chhathCard.style.cursor = "pointer";
    chhathCard.addEventListener("click", () => {
      if (chhathSong.paused) {
        pauseOthers(chhathSong);
        resetBgIcon();
        chhathSong.play();
        chhathCard.classList.add("playing");
      } else {
        chhathSong.pause();
        chhathCard.classList.remove("playing");
      }
    });
  }

  // ---- 4. Diwali festival card ----
  const diwaliCard = document.getElementById("diwaliCard");
  if (diwaliCard) {
    diwaliCard.style.cursor = "pointer";
    diwaliCard.addEventListener("click", () => {
      if (diwaliSong.paused) {
        pauseOthers(diwaliSong);
        resetBgIcon();
        diwaliSong.play();
        diwaliCard.classList.add("playing");
      } else {
        diwaliSong.pause();
        diwaliCard.classList.remove("playing");
      }
    });
  }

  // ---- 5. When bg music starts, clear the festival "playing" highlight ----
  bgMusic.addEventListener("play", () => {
    if (chhathCard) chhathCard.classList.remove("playing");
    if (diwaliCard) diwaliCard.classList.remove("playing");
  });

  // ---- 6. Reset UI state when a track ends ----
  chhathSong.addEventListener("ended", () => chhathCard && chhathCard.classList.remove("playing"));
  diwaliSong.addEventListener("ended", () => diwaliCard && diwaliCard.classList.remove("playing"));
  bgMusic.addEventListener("ended", resetBgIcon);

});
