const VERSION = "0.2.0";
const SPEED = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.05 : 1;
const NBSP = " ";

const INITIAL_STATE = { argent: 10000, energie: 100, sante: 100, respect: 50 };

const STATS = {
  argent: { label: "Argent", icon: "💰" },
  energie: { label: "Énergie", icon: "⚡" },
  sante: { label: "Santé", icon: "❤️" },
  respect: { label: "Respect", icon: "⭐" },
};

const SKINS = [
  { skin: "#c68a5a", dark: "#b07448" },
  { skin: "#8a5634", dark: "#7a4a2c" },
  { skin: "#5c3820", dark: "#4c2d19" },
];

const OUTFITS = [
  { outfit: "#ff7a1a", pagne: "#1a9e55" },
  { outfit: "#1fbf75", pagne: "#ffb703" },
  { outfit: "#3a86ff", pagne: "#ff7a00" },
  { outfit: "#9b5de5", pagne: "#f15bb5" },
];

const SPEAKERS = {
  guide: { name: "Vieux Père Ali", portrait: true, tone: "is-guide" },
  narrator: { name: "📍 Yopougon · 7h", portrait: false, tone: "" },
};

const player = { name: "", gender: "gars", skin: 1, outfit: 0 };
const g = (gars, go) => (player.gender === "go" ? go : gars);

const INTRO = [
  `Ehhh${NBSP}! On dit quoi${NBSP}? Bienvenue à Babi, la ville où même le soleil arrive en retard à cause des embouteillages.`,
  `Moi c'est Vieux Père Ali. 40 ans à Yop. Je connais tous les maquis, tous les gbakas… et même les nids de poule par leur prénom.`,
  `Avant de te lâcher dans Babi, faut qu'on fasse ta carte d'identité. Et c'est gratuit hein, pas besoin de tchoko${NBSP}!`,
];

const tutorial = () => [
  {
    target: null,
    text: `${player.name}${NBSP}! Hum, ça c'est un nom de quelqu'un qui va réussir. Bon, écoute bien, je vais te montrer comment Babi fonctionne.`,
  },
  {
    target: '[data-stat="argent"]',
    text: `Ça, c'est ton wari${NBSP}: 10${NBSP}000 FCFA. À Babi, l'argent c'est comme le courant${NBSP}: le délestage peut tomber à tout moment.`,
  },
  {
    target: '[data-stat="energie"]',
    text: `Ton énergie ⚡. Quand ça finit, même pour crier «${NBSP}Apprenti, à côté${NBSP}!${NBSP}» dans le gbaka devient difficile.`,
  },
  {
    target: '[data-stat="sante"]',
    text: `Ta santé ❤️. Le garba c'est bon, mais garba matin, midi et soir… ton corps va porter plainte.`,
  },
  {
    target: '[data-stat="respect"]',
    text: `Ton respect ⭐. À Babi, si on te prend pour un petit, c'est fini${NBSP}: même les enfants du quartier vont t'envoyer acheter du pain.`,
  },
  {
    target: null,
    text: `Chaque choix fait bouger tes jauges. Si une jauge tombe à zéro… ça va chauffer. Allez, on est ensemble${NBSP}! Ta journée commence.`,
  },
];

const SCENE = {
  time: "07:00",
  text: () =>
    `${player.name}, ton réveil sonne pour la 3e fois. Réunion importante au Plateau à 9h, mais dehors c'est giga embouteillage${NBSP}: même les piétons sont bloqués. On fait comment${NBSP}?`,
  next: "la réunion avec le boss au Plateau…",
  choices: [
    {
      id: "gbaka",
      icon: "🚐",
      label: "Prendre le Gbaka",
      quip: "Pas cher, mais tu vas sentir la sueur des autres",
      time: "08:50",
      effects: { argent: -500, energie: -30, respect: 5 },
      result: () =>
        `L'apprenti t'a ${g("coincé", "coincée")} entre une tantie et son sac de piment. Chemise froissée, mais tu es ${g("arrivé", "arrivée")} à l'heure. Petit à petit, l'oiseau fait son nid${NBSP}!`,
      advice: () => "Le gbaka, c'est l'école de la vie. Aujourd'hui tu as eu ton diplôme.",
    },
    {
      id: "yango",
      icon: "🚕",
      label: "Prendre un Yango",
      quip: "Clim + zouglou, mais ton wari va pleurer",
      time: "08:25",
      effects: { argent: -4000, energie: 0, respect: 20 },
      result: () =>
        `Clim à fond, zouglou à la radio. Tu descends devant le bureau comme ${g("un vrai boucantier", "une vraie boucantière")}. Même le gardien t'a ${g("salué", "saluée")} deux fois${NBSP}!`,
      advice: () =>
        `Hum, ${g("boucantier", "boucantière")}${NBSP}! Mais 4${NBSP}000 tous les matins… à la fin du mois tu vas manger quoi${NBSP}?`,
    },
    {
      id: "sleep",
      icon: "😴",
      label: "Rester dormir",
      quip: "Le lit est doux… le boss un peu moins",
      time: "10:30",
      effects: { argent: 0, energie: 20, respect: -40 },
      result: () =>
        `Tu as dormi comme un bébé. Mais au réveil${NBSP}: 12 appels manqués du boss. C'est gâté dêh${NBSP}!`,
      advice: () => `Dormir c'est bon. Mais le loyer, lui, il ne dort pas hein${NBSP}!`,
    },
  ],
};

const $ = (id) => document.getElementById(id);

const els = {
  game: $("game"),
  scene: $("scene"),
  hud: $("hud"),
  titleScreen: $("title-screen"),
  playBtn: $("play-btn"),
  version: $("version"),
  clock: $("clock"),
  dialog: $("dialog"),
  dialogTag: $("dialog-tag"),
  dialogText: $("dialog-text"),
  skipBtn: $("skip-btn"),
  recap: $("recap"),
  choices: $("choices"),
  toast: $("toast"),
  hero: $("hero"),
  previewHero: $("preview-hero"),
  creator: $("creator"),
  creatorForm: $("creator-form"),
  nameInput: $("name-input"),
  genderSeg: $("gender-seg"),
  skinSwatches: $("skin-swatches"),
  outfitSwatches: $("outfit-swatches"),
  gbaka: $("gbaka"),
  gbakaBubble: $("gbaka-bubble"),
  gbakaBubbleRect: $("gbaka-bubble-rect"),
  gbakaBubbleText: $("gbaka-bubble-text"),
  yango: $("yango"),
  zzz: $("zzz"),
  dim: $("dim"),
  sun: $("sun"),
};

let state = { ...INITIAL_STATE };
let busy = false;
let introDone = false;
let skipIntro = false;
let skipTyping = null;
let nextResolver = null;
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

function heroMarkup() {
  return `
    <ellipse cx="0" cy="0" rx="12" ry="2.6" fill="#000" opacity="0.2"/>
    <g class="hero__body">
      <g class="leg leg--l">
        <rect x="-6" y="-19" width="5" height="17" rx="2" fill="#2b2d42"/>
        <rect x="-8" y="-3" width="8" height="3.5" rx="1.6" fill="#f5f5f5"/>
      </g>
      <g class="leg leg--r">
        <rect x="1" y="-19" width="5" height="17" rx="2" fill="#2b2d42"/>
        <rect x="1" y="-3" width="8" height="3.5" rx="1.6" fill="#f5f5f5"/>
      </g>
      <path class="only-go pagne" d="M-9.5 -20 H9.5 L12 -7 H-12 Z"/>
      <path class="only-go" d="M-10.5 -15 H10.5 M-11.5 -10.5 H11.5" stroke="#fff" stroke-width="1.1" opacity="0.55"/>
      <rect class="skin" x="-12.5" y="-36" width="4.5" height="15" rx="2.2"/>
      <rect class="skin" x="8" y="-36" width="4.5" height="15" rx="2.2"/>
      <rect class="outfit" x="-9.5" y="-38" width="19" height="21" rx="6"/>
      <path d="M-9 -29 H9 M-9 -24 H9" stroke="#fff" stroke-width="1.3" opacity="0.35"/>
      <path d="M-4 -38 L0 -34 L4 -38" fill="none" stroke="#fff" stroke-width="1.4"/>
      <path d="M-8 -37 L7 -20" stroke="#3b2a20" stroke-width="2"/>
      <rect class="skin-dark" x="-2.5" y="-42" width="5" height="5"/>
      <circle class="skin-dark" cx="-9.5" cy="-48" r="2"/>
      <circle class="skin-dark" cx="9.5" cy="-48" r="2"/>
      <circle class="skin" cx="0" cy="-49" r="9.5"/>
      <path class="only-gars" d="M-9.5 -51 Q-9 -60 0 -60 Q9 -60 9.5 -51 Q5 -55 0 -55 Q-5 -55 -9.5 -51 Z" fill="#1b1b1b"/>
      <g class="only-go">
        <circle cx="0" cy="-62" r="5.5" fill="#1b1b1b"/>
        <path d="M-10 -49 Q-10.5 -61 0 -61 Q10.5 -61 10 -49 Q7 -56 0 -56 Q-7 -56 -10 -49 Z" fill="#1b1b1b"/>
        <circle cx="-9.8" cy="-44.5" r="1.4" fill="#ffc531"/>
        <circle cx="9.8" cy="-44.5" r="1.4" fill="#ffc531"/>
      </g>
      <g class="eyes">
        <circle cx="-3.3" cy="-48.5" r="1.3" fill="#1a1a1a"/>
        <circle cx="3.3" cy="-48.5" r="1.3" fill="#1a1a1a"/>
      </g>
      <path d="M-3 -44 Q0 -41.8 3 -44" fill="none" stroke="#3b1f12" stroke-width="1.2" stroke-linecap="round"/>
    </g>`;
}

function applyLook() {
  const { skin, dark } = SKINS[player.skin];
  const { outfit, pagne } = OUTFITS[player.outfit];
  [els.hero, els.previewHero].forEach((el) => {
    el.classList.toggle("is-go", player.gender === "go");
    el.style.setProperty("--skin", skin);
    el.style.setProperty("--skin-dark", dark);
    el.style.setProperty("--outfit", outfit);
    el.style.setProperty("--pagne", pagne);
  });
  els.nameInput.placeholder = g("Koffi", "Awa");
  els.genderSeg.querySelectorAll("button").forEach((b) => b.classList.toggle("is-on", b.dataset.value === player.gender));
  els.skinSwatches.querySelectorAll(".swatch").forEach((b, i) => b.classList.toggle("is-on", i === player.skin));
  els.outfitSwatches.querySelectorAll(".swatch").forEach((b, i) => b.classList.toggle("is-on", i === player.outfit));
}

function buildSwatches(host, list, colorKey, prop) {
  list.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "swatch";
    btn.style.setProperty("--c", item[colorKey]);
    btn.setAttribute("aria-label", `${prop} ${i + 1}`);
    btn.addEventListener("click", () => {
      player[prop] = i;
      applyLook();
    });
    host.appendChild(btn);
  });
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

function spotlight(selector) {
  els.hud.querySelectorAll(".spotlight").forEach((el) => el.classList.remove("spotlight"));
  els.hud.classList.toggle("is-tuto", Boolean(selector));
  if (selector) els.hud.querySelector(selector).classList.add("spotlight");
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

function setSpeaker(speaker, label = speaker.name) {
  els.dialogTag.textContent = label;
  els.dialogTag.className = `dialog__tag ${speaker.tone}`;
  els.dialog.classList.toggle("has-portrait", speaker.portrait);
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

function waitForTap() {
  els.dialog.classList.add("can-next");
  return new Promise((resolve) => {
    nextResolver = () => {
      nextResolver = null;
      els.dialog.classList.remove("can-next");
      resolve();
    };
  });
}

async function say(text, speaker) {
  setSpeaker(speaker);
  await typeText(text);
  if (!skipIntro) await waitForTap();
}

function handleTap() {
  if (skipTyping) skipTyping();
  else if (nextResolver) nextResolver();
}

function openCreator() {
  els.creator.hidden = false;
  return new Promise((resolve) => {
    els.creatorForm.onsubmit = (event) => {
      event.preventDefault();
      player.name = els.nameInput.value.trim() || els.nameInput.placeholder;
      els.nameInput.blur();
      els.creator.hidden = true;
      resolve();
    };
  });
}

async function runIntro() {
  skipIntro = false;
  els.dialog.classList.add("is-intro");

  for (const line of INTRO) {
    if (skipIntro) break;
    await say(line, SPEAKERS.guide);
  }

  els.dialog.classList.remove("is-intro");
  await openCreator();
  els.dialog.classList.add("is-intro");

  for (const step of tutorial()) {
    if (skipIntro) break;
    spotlight(step.target);
    await say(step.text, SPEAKERS.guide);
  }

  spotlight(null);
  els.dialog.classList.remove("is-intro");
  introDone = true;
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

function setBubble(text) {
  els.gbakaBubbleText.textContent = text;
  const width = els.gbakaBubbleText.getComputedTextLength() + 24;
  els.gbakaBubbleRect.setAttribute("width", width);
  els.gbakaBubbleRect.setAttribute("x", 48 - width / 2);
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
    setBubble(`Plateau${NBSP}! Plateau${NBSP}! 500${NBSP}!`);
    await drive(els.gbaka, 460, 0, 1300, "cubic-bezier(0.15, 0.75, 0.3, 1)");
    els.gbakaBubble.classList.add("is-on");
    await wait(1100);
    await walk(15, 52, 900);
    await fadeOut(els.hero, 200);
    setBubble(`Tantie, serre-toi un peu${NBSP}!`);
    await wait(1300);
    els.gbakaBubble.classList.remove("is-on");
    await drive(els.gbaka, 0, -480, 1500, "cubic-bezier(0.55, 0, 0.8, 0.4)");
  },

  async yango() {
    showToast("🚕", "Ton chauffeur est arrivé", `Il dit qu'il est «${NBSP}à côté${NBSP}» depuis 20 min`, 3000);
    await drive(els.yango, 460, 0, 1400, "cubic-bezier(0.15, 0.75, 0.3, 1)");
    await wait(600);
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
    showToast("📱", "12 appels manqués", "Le Boss 😡 · Réunion du Plateau", 3000);
    await wait(1200);
  },
};

function createChip(text, tone) {
  const chip = document.createElement("span");
  chip.className = `chip ${tone}`;
  chip.textContent = text;
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

    const quip = document.createElement("span");
    quip.className = "choice__quip";
    quip.textContent = choice.quip;

    const effects = document.createElement("span");
    effects.className = "choice__effects";
    if (!choice.effects.argent) effects.appendChild(createChip("Gratuit", "pos"));
    Object.entries(choice.effects)
      .filter(([, delta]) => delta !== 0)
      .forEach(([key, delta]) => {
        const text = key === "argent" ? formatDelta(key, delta) : `${STATS[key].icon} ${formatDelta(key, delta)}`;
        effects.appendChild(createChip(text, deltaClass(delta)));
      });

    body.append(label, quip, effects);
    btn.append(icon, body);
    btn.disabled = state.argent + (choice.effects.argent ?? 0) < 0;
    btn.addEventListener("click", () => handleChoice(choice));
    els.choices.appendChild(btn);
  });
}

function showRecap(applied, advice) {
  const items = Object.entries(STATS)
    .map(([key, { label, icon }]) => {
      const delta = applied[key] ?? 0;
      const value = key === "argent" ? formatMoney(state[key]) : state[key];
      return `
        <div class="recap__item">
          <span class="recap__label">${icon} ${label}</span>
          <strong>${value}</strong>
          <span class="delta ${deltaClass(delta)}">${formatDelta(key, delta)}</span>
        </div>`;
    })
    .join("");
  els.recap.innerHTML = `${items}<p class="advice"><span><strong>Vieux Père${NBSP}:</strong> ${advice}</span></p>`;
  els.recap.querySelector(".advice").prepend(document.querySelector(".dialog__portrait").cloneNode(true));
  els.recap.hidden = false;
}

function renderEnd() {
  els.choices.innerHTML = "";

  const teaser = document.createElement("p");
  teaser.className = "teaser";
  teaser.textContent = `📺 Prochain épisode${NBSP}: ${SCENE.next}`;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn--play btn--block";
  btn.textContent = "🔁 Rejouer";
  btn.addEventListener("click", restart);

  els.choices.append(teaser, btn);
  btn.scrollIntoView({ behavior: SPEED < 1 ? "auto" : "smooth", block: "end" });
}

async function handleChoice(choice) {
  if (busy) return;
  busy = true;

  els.choices.innerHTML = "";
  setSpeaker(SPEAKERS.narrator, `${choice.icon} ${choice.label}`);
  els.dialogText.textContent = "…";

  await cinematics[choice.id]();

  els.clock.textContent = choice.time;
  const applied = applyEffects(choice.effects);
  renderHud(applied);
  await typeText(choice.result());
  showRecap(applied, choice.advice());
  renderEnd();

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
  els.recap.hidden = true;
  els.choices.innerHTML = "";

  setSpeaker(SPEAKERS.narrator);
  await typeText(SCENE.text());
  renderChoices();
  busy = false;
}

function restart() {
  if (busy) return;
  state = { ...INITIAL_STATE };
  renderHud();
  startScene();
}

async function play() {
  els.titleScreen.classList.add("is-hidden");
  els.game.classList.remove("is-title");
  if (!introDone) await runIntro();
  startScene();
}

els.hero.innerHTML = heroMarkup();
els.previewHero.innerHTML = heroMarkup();
buildSwatches(els.skinSwatches, SKINS, "skin", "skin");
buildSwatches(els.outfitSwatches, OUTFITS, "outfit", "outfit");
els.genderSeg.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    player.gender = btn.dataset.value;
    applyLook();
  });
});

els.dialog.addEventListener("click", handleTap);
els.scene.addEventListener("click", handleTap);
els.skipBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  skipIntro = true;
  handleTap();
  handleTap();
});
els.playBtn.addEventListener("click", play, { once: true });

els.version.textContent = `v${VERSION}`;
applyLook();
renderHud();
