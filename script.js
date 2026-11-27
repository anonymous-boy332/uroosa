const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openBtn");
const yesBtn = document.getElementById("yesBtn");
const celebration = document.getElementById("celebration");

openBtn.addEventListener("click", () => {
  intro.style.transition = "opacity .8s ease";
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.classList.add("hidden");
    mainContent.classList.remove("hidden");
    window.scrollTo(0, 0);
    observeSections();
  }, 800);
});

function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(section => observer.observe(section));
}

yesBtn.addEventListener("click", () => {
  celebration.classList.remove("hidden");
  celebration.scrollIntoView({ behavior: "smooth" });
  yesBtn.disabled = true;
  yesBtn.textContent = "THANK YOU ❤️";
  startConfetti();

  const message = "Atiq, I accept your proposal! ❤️ — Uroosa Latif";
  const whatsappURL = "https://wa.me/923302820612?text=" + encodeURIComponent(message);
  const whatsappWindow = window.open(whatsappURL, "_blank");

  if (!whatsappWindow) {
    window.location.href = whatsappURL;
  }
});

function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const colors = ["#d6b779", "#c98d91", "#fff8f0", "#e9a6b5", "#ffffff"];
  const pieces = [];

  for (let i = 0; i < 180; i++) {
    pieces.push({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight,
      size: Math.random() * 7 + 3,
      speed: Math.random() * 4 + 2,
      drift: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360
    });
  }

  let frame = 0;

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += 3;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();

      if (p.y > window.innerHeight) {
        p.y = -15;
        p.x = Math.random() * window.innerWidth;
      }
    });

    frame++;
    if (frame < 420) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animate();
}

function createFloatingHeart() {
  const container = document.getElementById("heartsBg");
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (Math.random() * 17 + 10) + "px";
  heart.style.animationDuration = (Math.random() * 9 + 9) + "s";

  container.appendChild(heart);
  setTimeout(() => heart.remove(), 19000);
}

setInterval(createFloatingHeart, 1300);
