const VERSION = "0.2.0";
const SPEED = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.05 : 1;

const INITIAL_STATE = { argent: 10000, energie: 100, sante: 100, respect: 50 };

const STATS = {
  argent: { label: "Argent", icon: "💰" },
  energie: { label: "Énergie", icon: "⚡" },
  sante: { label: "Santé", icon: "❤️" },
  respect: { label: "Respect", icon: "⭐" },
};

const SCENE = {
  place: "📍 Yopougon",
  time: "07:00",
  text: "Tu te réveilles à Yopougon, il est 7h. Tu as une réunion importante au Plateau mais il y a un giga embouteillage. Que fais-tu\u00a0?",
  choices: [
    {
      id: "gbaka",
      icon: "🚐",
      label: "Prendre le Gbaka",
      time: "08:50",
      effects: { argent: -500, energie: -30, respect: 5 },
      result: "Serré comme des sardines entre un sac de riz et une tantie… mais t'es arrivé à l'heure\u00a0!",
    },
    {
      id: "yango",
      icon: "🚕",
      label: "Prendre un Yango",
      time: "08:25",
      effects: { argent: -4000, energie: 0, respect: 20 },
      result: "Clim, musique, arrivée en boss. Le patron t'a vu descendre de la voiture. Respect\u00a0!",
    },
    {
      id: "sleep",
      icon: "😴",
      label: "Rester dormir",
      time: "10:30",
      effects: { argent: 0, energie: 20, respect: -40 },
      result: "Bien reposé… mais ton téléphone affiche 12 appels manqués du boss. Aïe.",
    },
  ],
};

const $ = (id) => document.getElementById(id);

const els = {
  titleScreen: $("title-screen"),
  playBtn: $("play-btn"),
  version: $("version"),
  clock: $("clock"),
  dialog: $("dialog"),
  dialogTag: $("dialog-tag"),
  dialogText: $("dialog-text"),
  recap: $("recap"),
  choices: $("choices"),
  toast: $("toast"),
  hero: $("hero"),
  gbaka: $("gbaka"),
  gbakaBubble: $("gbaka-bubble"),
  yango: $("yango"),
  zzz: $("zzz"),
  dim: $("dim"),
  sun: $("sun"),
};

let state = { ...INITIAL_STATE };
let busy = false;
let skipTyping = null;
let toastTimer = null;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms * SPEED));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const formatMoney = (n) => `${n.toLocaleString("fr-FR")} F`;

function animate(el, keyframes, { duration, easing = "ease" }) {
  return el.animate(keyframes, { duration: duration * SPEED, easing, fill: "forwards" }).finished;
}

function formatDelta(key, delta) {
  if (delta === 0) return "±0";
  const sign = delta > 0 ? "+" : "−";
  const abs = Math.abs(delta);
  return key === "argent" ? `${sign}${abs.toLocaleString("fr-FR")} F` : `${sign}${abs}`;
}

function deltaClass(delta) {
  if (delta > 0) return "pos";
  if (delta < 0) return "neg";
  return "neutral";
}

function renderHud(changes = {}) {
  Object.keys(STATS).forEach((key, i) => {
    const value = state[key];
    const host = document.querySelector(`[data-stat="${key}"]`);
    $(`val-${key}`).textContent = key === "argent" ? value.toLocaleString("fr-FR") : value;

    if (key !== "argent") {
      $(`bar-${key}`).style.width = `${value}%`;
      host.classList.toggle("is-low", value <= 25);
    }

    if (changes[key]) setTimeout(() => floatDelta(host, key, changes[key]), i * 160 * SPEED);
  });
}

function floatDelta(host, key, delta) {
  const el = document.createElement("span");
  el.className = `float ${deltaClass(delta)}`;
  el.textContent = formatDelta(key, delta);
  el.addEventListener("animationend", () => el.remove());
  host.appendChild(el);

  host.classList.remove("bump");
  void host.offsetWidth;
  host.classList.add("bump");
}

function applyEffects(effects) {
  const applied = {};
  Object.entries(effects).forEach(([key, delta]) => {
    const before = state[key];
    state[key] = key === "argent" ? before + delta : clamp(before + delta, 0, 100);
    applied[key] = state[key] - before;
  });
  return applied;
}

function typeText(text) {
  const el = els.dialogText;
  return new Promise((resolve) => {
    let i = 0;
    const finish = () => {
      clearInterval(timer);
      el.textContent = text;
      skipTyping = null;
      resolve();
    };
    const timer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) finish();
    }, 22);
    skipTyping = finish;
    if (SPEED < 1) finish();
  });
}

function showToast(icon, title, subtitle, duration = 2600) {
  els.toast.innerHTML = `<span class="toast__icon">${icon}</span><div><strong>${title}</strong><small>${subtitle}</small></div>`;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, duration * SPEED);
}

function hideToast() {
  clearTimeout(toastTimer);
  els.toast.hidden = true;
}

function drive(el, from, to, duration, easing) {
  return animate(el, [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }], { duration, easing });
}

async function walk(x, y, duration) {
  els.hero.classList.add("walking");
  await animate(els.hero, [{ transform: "translate(0px, 0px)" }, { transform: `translate(${x}px, ${y}px)` }], {
    duration,
    easing: "linear",
  });
  els.hero.classList.remove("walking");
}

const fadeOut = (el, duration = 300) => animate(el, [{ opacity: 1 }, { opacity: 0 }], { duration });

const cinematics = {
  async gbaka() {
    await drive(els.gbaka, 460, 0, 1300, "cubic-bezier(0.15, 0.75, 0.3, 1)");
    els.gbakaBubble.classList.add("is-on");
    await wait(1000);
    await walk(15, 52, 900);
    await fadeOut(els.hero, 200);
    els.gbakaBubble.classList.remove("is-on");
    await wait(300);
    await drive(els.gbaka, 0, -480, 1500, "cubic-bezier(0.55, 0, 0.8, 0.4)");
  },

  async yango() {
    showToast("🚕", "Ton chauffeur est arrivé", "Corolla grise · 1234 AB 01");
    await drive(els.yango, 460, 0, 1400, "cubic-bezier(0.15, 0.75, 0.3, 1)");
    await wait(500);
    await walk(30, 52, 900);
    await fadeOut(els.hero, 200);
    await wait(300);
    await drive(els.yango, 0, -480, 1100, "cubic-bezier(0.55, 0, 0.8, 0.4)");
  },

  async sleep() {
    await walk(-112, -8, 1500);
    await fadeOut(els.hero, 250);
    els.zzz.classList.add("is-on");
    await animate(els.dim, [{ opacity: 0 }, { opacity: 0.6 }], { duration: 700 });
    await wait(1800);
    await Promise.all([
      animate(els.dim, [{ opacity: 0.6 }, { opacity: 0 }], { duration: 900 }),
      animate(els.sun, [{ transform: "translateY(0px)" }, { transform: "translateY(-70px)" }], {
        duration: 1200,
        easing: "ease-out",
      }),
    ]);
    els.zzz.classList.remove("is-on");
    showToast("📱", "12 appels manqués", "Le Boss · Réunion du Plateau", 3000);
    await wait(1200);
  },
};

function createChip(key, delta) {
  const chip = document.createElement("span");
  chip.className = `chip ${deltaClass(delta)}`;
  chip.textContent = key === "argent" ? formatDelta(key, delta) : `${STATS[key].icon} ${formatDelta(key, delta)}`;
  return chip;
}

function renderChoices() {
  els.choices.innerHTML = "";

  SCENE.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice choice--${choice.id}`;
    btn.style.setProperty("--i", i);

    const icon = document.createElement("span");
    icon.className = "choice__icon";
    icon.textContent = choice.icon;

    const body = document.createElement("span");
    body.className = "choice__body";

    const label = document.createElement("span");
    label.className = "choice__label";
    label.textContent = choice.label;

    const effects = document.createElement("span");
    effects.className = "choice__effects";
    if (!choice.effects.argent) {
      const free = document.createElement("span");
      free.className = "chip pos";
      free.textContent = "Gratuit";
      effects.appendChild(free);
    }
    Object.entries(choice.effects)
      .filter(([, delta]) => delta !== 0)
      .forEach(([key, delta]) => effects.appendChild(createChip(key, delta)));

    body.append(label, effects);
    btn.append(icon, body);
    btn.disabled = state.argent + (choice.effects.argent ?? 0) < 0;
    btn.addEventListener("click", () => handleChoice(choice));
    els.choices.appendChild(btn);
  });
}

function showRecap(applied) {
  els.recap.innerHTML = Object.entries(STATS)
    .map(([key, { label, icon }]) => {
      const delta = applied[key] ?? 0;
      const value = key === "argent" ? formatMoney(state[key]) : `${state[key]}/100`;
      return `
        <div class="recap__item">
          <span class="recap__label">${icon} ${label}</span>
          <strong>${value}</strong>
          <span class="delta ${deltaClass(delta)}">${formatDelta(key, delta)}</span>
        </div>`;
    })
    .join("");
  els.recap.hidden = false;
}

function renderReplay() {
  els.choices.innerHTML = "";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn--play btn--block";
  btn.textContent = "🔁 Rejouer";
  btn.addEventListener("click", restart);
  els.choices.appendChild(btn);
}

async function handleChoice(choice) {
  if (busy) return;
  busy = true;

  els.choices.innerHTML = "";
  els.dialogTag.textContent = `${choice.icon} ${choice.label}`;
  els.dialogText.textContent = "…";

  await cinematics[choice.id]();

  els.clock.textContent = choice.time;
  const applied = applyEffects(choice.effects);
  renderHud(applied);
  await typeText(choice.result);
  showRecap(applied);
  renderReplay();

  busy = false;
}

function resetWorld() {
  [els.hero, els.gbaka, els.yango, els.dim, els.sun].forEach((el) => {
    el.getAnimations().forEach((a) => a.cancel());
  });
  els.hero.classList.remove("walking");
  els.gbakaBubble.classList.remove("is-on");
  els.zzz.classList.remove("is-on");
  hideToast();
}

async function startScene() {
  busy = true;
  resetWorld();
  els.clock.textContent = SCENE.time;
  els.dialogTag.textContent = SCENE.place;
  els.recap.hidden = true;
  els.choices.innerHTML = "";

  await typeText(SCENE.text);
  renderChoices();
  busy = false;
}

function restart() {
  if (busy) return;
  state = { ...INITIAL_STATE };
  renderHud();
  startScene();
}

els.dialog.addEventListener("click", () => skipTyping?.());

els.playBtn.addEventListener("click", () => {
  els.titleScreen.classList.add("is-hidden");
  $("game").classList.remove("is-title");
  startScene();
});

els.version.textContent = `v${VERSION}`;
renderHud();
