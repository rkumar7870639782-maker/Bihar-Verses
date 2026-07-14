/* ==========================================================
   BIHARVERSE — SCRIPT
   Single file, loaded once, no duplicate listeners.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- LOADER ---------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }
  });

  /* ---------------- SCROLL PROGRESS BAR ---------------- */
  const progressBar = document.getElementById("progressBar");
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && height > 0) {
      progressBar.style.width = (scrollTop / height) * 100 + "%";
    }
  });

  /* ---------------- MOBILE MENU ---------------- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ---------------- SMOOTH SCROLL WITH HEADER OFFSET ---------------- */
  const headerHeight = document.querySelector("header")?.offsetHeight || 70;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ---------------- HERO TYPING EFFECT ---------------- */
  const heroTyping = document.getElementById("heroTyping");
  const typingText = "Explore The Pride Of Bihar";

  if (heroTyping) {
    let i = 0;
    (function type() {
      if (i < typingText.length) {
        heroTyping.textContent += typingText.charAt(i);
        i++;
        setTimeout(type, 70);
      }
    })();
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealTargets = document.querySelectorAll(
    "section > *:not(.gallery-container), .card, .tour-card, .food-card, .festival-card, .gallery-item"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------------- ANIMATED STAT COUNTERS ---------------- */
  const statBoxes = document.querySelectorAll(".stat-box h3[data-target]");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const format = el.dataset.format;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = (format === "comma" ? value.toLocaleString("en-IN") : value) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statBoxes.forEach(box => statObserver.observe(box));

  /* ---------------- RANDOM BIHAR FACTS ---------------- */
  const facts = [
    "Bihar has 38 districts.",
    "Nalanda was one of the world's oldest residential universities.",
    "Chhath Puja is Bihar's most widely celebrated festival.",
    "Patna is one of the oldest continuously inhabited cities in the world.",
    "The Mahabodhi Temple in Bodh Gaya is a UNESCO World Heritage Site.",
    "Valmiki Tiger Reserve is Bihar's only tiger reserve.",
    "Guru Gobind Singh Ji was born at Patna Sahib.",
    "Rajgir was once the capital of the Magadha Empire."
  ];
  const factText = document.getElementById("factText");
  if (factText) {
    setInterval(() => {
      const random = Math.floor(Math.random() * facts.length);
      factText.textContent = facts[random];
    }, 6000);
  }

  /* ---------------- GALLERY LIGHTBOX ---------------- */
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (galleryImages.length) {
    const overlay = document.createElement("div");
    overlay.id = "lightboxOverlay";
    Object.assign(overlay.style, {
      display: "none", position: "fixed", inset: "0",
      background: "rgba(0,0,0,.85)", zIndex: "2000",
      justifyContent: "center", alignItems: "center", cursor: "zoom-out"
    });
    const overlayImg = document.createElement("img");
    Object.assign(overlayImg.style, { maxWidth: "90%", maxHeight: "85%", borderRadius: "12px" });
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);

    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        overlayImg.src = img.src;
        overlayImg.alt = img.alt;
        overlay.style.display = "flex";
      });
    });
    overlay.addEventListener("click", () => { overlay.style.display = "none"; });
  }

  /* ---------------- QUIZ ---------------- */
  const quizQuestions = document.querySelectorAll(".quiz-question");
  const submitQuiz = document.getElementById("submitQuiz");
  const quizResult = document.getElementById("quizResult");

  quizQuestions.forEach(question => {
    const buttons = question.querySelectorAll(".quiz-options button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  });

  if (submitQuiz) {
    submitQuiz.addEventListener("click", () => {
      let score = 0;
      let unanswered = 0;

      quizQuestions.forEach(question => {
        const correct = question.dataset.correct;
        const buttons = question.querySelectorAll(".quiz-options button");
        const selected = question.querySelector(".quiz-options button.selected");

        if (!selected) { unanswered++; return; }

        buttons.forEach(b => b.disabled = true);

        if (selected.textContent.trim() === correct) {
          selected.classList.add("correct");
          score++;
        } else {
          selected.classList.add("wrong");
          buttons.forEach(b => {
            if (b.textContent.trim() === correct) b.classList.add("correct");
          });
        }
      });

      if (unanswered > 0 && quizResult) {
        quizResult.textContent = `Please answer all questions — ${unanswered} left.`;
        return;
      }

      submitQuiz.disabled = true;
      submitQuiz.style.opacity = "0.6";
      if (quizResult) {
        quizResult.textContent = `You scored ${score} out of ${quizQuestions.length}! 🎉`;
      }
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll", () => {
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 400);
  });
  if (topBtn) {
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------------- DARK MODE (persisted) ---------------- */
  const darkModeBtn = document.getElementById("darkModeBtn");

  const applyDarkMode = (on) => {
    document.body.classList.toggle("dark", on);
    if (darkModeBtn) {
      darkModeBtn.innerHTML = on
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
  };

  applyDarkMode(localStorage.getItem("biharverse-dark") === "true");

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark");
      applyDarkMode(isDark);
      localStorage.setItem("biharverse-dark", isDark);
    });
  }

  /* Music player is now handled by bihar-audio.js (#bgMusicBtn) */

  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formNote) {
        formNote.textContent = "Thanks! Your message has been noted. (Connect a form service like Formspree to receive these by email.)";
      }
      contactForm.reset();
    });
  }

  /* ---------------- NEWSLETTER FORM ---------------- */
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector("button");
      const original = btn.textContent;
      btn.textContent = "Subscribed ✓";
      newsletterForm.reset();
      setTimeout(() => { btn.textContent = original; }, 2500);
    });
  }

  /* ---------------- AI CHAT (rule-based FAQ bot) ---------------- */
  const chatBtn = document.getElementById("chatBtn");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");

  if (chatBtn && chatBox) {
    chatBtn.addEventListener("click", () => chatBox.classList.toggle("open"));
  }
  if (closeChat && chatBox) {
    closeChat.addEventListener("click", () => chatBox.classList.remove("open"));
  }

  const faq = [
  { keys: ["capital"], reply: "The capital of Bihar is Patna." },
  { keys: ["food", "eat", "dish"], reply: "Try Litti Chokha, Thekua, Khaja and Champaran Meat — all Bihar favourites!" },
  { keys: ["festival"], reply: "Chhath Puja is Bihar's biggest festival, dedicated to the Sun God." },
  { keys: ["buddha", "enlightenment"], reply: "Lord Buddha attained enlightenment at Bodh Gaya." },
  { keys: ["nalanda"], reply: "Nalanda is home to one of the world's oldest residential universities." },
  { keys: ["place", "visit", "tourist"], reply: "Top places to visit: Bodh Gaya, Nalanda, Rajgir, Vaishali and the Golghar in Patna." },
  { keys: ["population"], reply: "Bihar's population is over 130 million people." },
  { keys: ["district"], reply: "Bihar has 38 districts." },
  { keys: ["history"], reply: "Bihar was the seat of ancient empires like Magadha, Maurya, and Gupta dynasties." },
  { keys: ["rajgir"], reply: "Rajgir was the ancient capital of Magadha and has hot springs and Buddhist sites." },
  { keys: ["vaishali"], reply: "Vaishali is known as the birthplace of Lord Mahavira and one of the world's earliest republics." },
  { keys: ["famous person", "famous people", "leader", "freedom fighter"], reply: "Bihar has produced leaders like Dr. Rajendra Prasad (India's first President) and Jayaprakash Narayan." },
  { keys: ["rajendra prasad"], reply: "Dr. Rajendra Prasad, India's first President, was from Bihar." },
  { keys: ["cricket", "sports", "player"], reply: "Bihar's sports scene is growing, with cricket and kabaddi being very popular." },
  { keys: ["weather", "climate", "temperature"], reply: "Bihar has a humid subtropical climate — hot summers, monsoon rains, and mild winters." },
  { keys: ["language", "speak"], reply: "The main languages spoken in Bihar are Hindi, Bhojpuri, Maithili, and Magahi." },
  { keys: ["transport", "travel", "train", "bus"], reply: "Patna Junction is a major railway hub; Bihar is well connected by trains, buses, and Patna Airport." },
  { keys: ["river", "ganga"], reply: "The Ganga river flows through Bihar and is central to its culture and agriculture." },
  { keys: ["chief minister", "cm"], reply: "You can check the latest Chief Minister of Bihar on the official Bihar government website." },
  { keys: ["patna"], reply: "Patna is the capital and largest city of Bihar, known for Golghar, Patna Sahib, and Gandhi Maidan." },
  { keys: ["gaya"], reply: "Gaya is a major pilgrimage city, home to Bodh Gaya and Vishnupad Temple." },
  { keys: ["madhubani", "art", "painting"], reply: "Madhubani painting is a traditional folk art form originating from Bihar." },
  { keys: ["dance", "music", "culture"], reply: "Bihar's culture includes folk dances like Jat-Jatin and music forms like Bhojpuri and Maithili songs." },
  { keys: ["university", "college", "education"], reply: "Bihar is home to Nalanda University, Patna University, and IIT Patna." }, 
  ];

  function botReply(message) {
    const lower = message.toLowerCase();
    const match = faq.find(item => item.keys.some(k => lower.includes(k)));
    return match ? match.reply : "I'm not sure about that yet — try asking about Bihar's capital, food, festivals or tourist places!";
  }

  function addMessage(text, className) {
    if (!chatBody) return;
    const p = document.createElement("p");
    p.className = className;
    p.textContent = text;
    chatBody.appendChild(p);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = chatInput.value.trim();
      if (!value) return;
      addMessage(value, "user-msg");
      chatInput.value = "";
      setTimeout(() => addMessage(botReply(value), "bot-msg"), 400);
    });
  }

  /* ---------------- WELCOME LOG ---------------- */
  console.log("✅ BiharVerse loaded successfully");

});
