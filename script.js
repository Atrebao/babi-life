const VERSION = "0.4.0";
const SPEED = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.05 : 1;

const LIVES = { travailleur: LIFE_TRAVAILLEUR };

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
  narrator: { name: "📍 Babi", portrait: false, tone: "" },
};

const player = { name: "", gender: "gars", skin: 1, outfit: 0, status: "travailleur" };
const life = () => LIVES[player.status];
const g = (gars, go) => (player.gender === "go" ? go : gars);

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
  world: $("world"),
  clockIcon: $("clock-icon"),
  officeScreen: $("office-screen"),
  transition: $("transition"),
  transitionIcon: $("transition-icon"),
  transitionPlace: $("transition-place"),
  transitionTime: $("transition-time"),
};

let state = { ...life().start };
let busy = false;
let introDone = false;
let skipIntro = false;
let skipTyping = null;
let nextResolver = null;
let toastTimer = null;
let sceneIndex = 0;
const flags = {};

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
      <path class="strap" d="M-8 -37 L7 -20" stroke="#3b2a20" stroke-width="2"/>
      <path class="opt opt-tie tie" d="M0 -37.5 L-2 -34 L0 -23 L2 -34 Z"/>
      <rect class="opt opt-apron" x="-7.5" y="-30" width="15" height="22" rx="2" fill="#fff"/>
      <rect class="skin-dark" x="-2.5" y="-42" width="5" height="5"/>
      <circle class="skin-dark" cx="-9.5" cy="-48" r="2"/>
      <circle class="skin-dark" cx="9.5" cy="-48" r="2"/>
      <circle class="skin" cx="0" cy="-49" r="9.5"/>
      <path class="only-gars" d="M-9.5 -51 Q-9 -60 0 -60 Q9 -60 9.5 -51 Q5 -55 0 -55 Q-5 -55 -9.5 -51 Z" fill="#1b1b1b"/>
      <g class="only-go hair-go">
        <circle cx="0" cy="-62" r="5.5" fill="#1b1b1b"/>
        <path d="M-10 -49 Q-10.5 -61 0 -61 Q10.5 -61 10 -49 Q7 -56 0 -56 Q-7 -56 -10 -49 Z" fill="#1b1b1b"/>
      </g>
      <g class="opt opt-wrap">
        <path class="wrap" d="M-11 -49 Q-12.5 -63 0 -64 Q12.5 -63 11 -49 Q6 -55 0 -55 Q-6 -55 -11 -49 Z"/>
        <ellipse class="wrap" cx="6" cy="-64" rx="6" ry="3.5" transform="rotate(-20 6 -64)"/>
      </g>
      <g class="only-go">
        <circle cx="-9.8" cy="-44.5" r="1.4" fill="#ffc531"/>
        <circle cx="9.8" cy="-44.5" r="1.4" fill="#ffc531"/>
      </g>
      <g class="eyes">
        <circle cx="-3.3" cy="-48.5" r="1.3" fill="#1a1a1a"/>
        <circle cx="3.3" cy="-48.5" r="1.3" fill="#1a1a1a"/>
      </g>
      <g class="opt opt-glasses" fill="none" stroke="#1a1a1a" stroke-width="0.8">
        <circle cx="-3.3" cy="-48.5" r="2.7"/>
        <circle cx="3.3" cy="-48.5" r="2.7"/>
        <path d="M-0.6 -48.5 H0.6"/>
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

const sceneIntros = {
  async blackout() {
    await wait(700);
    els.officeScreen.classList.add("is-off");
    animate(els.dim, [{ opacity: 0 }, { opacity: 0.55 }], { duration: 250 });
    showToast("⚡", `Délestage${NBSP}!`, "Tout le Plateau est dans le noir", 2600);
    await wait(900);
  },
};

function emote(x, emoji) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
  el.setAttribute("x", x);
  el.setAttribute("y", 270);
  el.setAttribute("text-anchor", "middle");
  el.classList.add("emote");
  el.textContent = emoji;
  el.addEventListener("animationend", () => el.remove());
  els.world.appendChild(el);
}

async function react(scene, [heroEmoji, npcEmoji]) {
  animate(els.hero, [{ transform: "translateY(0px)" }, { transform: "translateY(-7px)" }, { transform: "translateY(0px)" }], {
    duration: 380,
    easing: "ease-out",
  });
  emote(150, heroEmoji);
  await wait(800);
  if (npcEmoji && scene.npcs?.length) emote(CAST[scene.npcs[0]].x, npcEmoji);
  await wait(1100);
}

function setupCast() {
  document.querySelectorAll("[data-npc]").forEach((el) => {
    const npc = CAST[el.dataset.npc];
    el.innerHTML = heroMarkup();
    el.classList.toggle("is-go", npc.gender === "go");
    el.classList.add(...npc.looks);
    el.style.setProperty("--skin", SKINS[npc.skin].skin);
    el.style.setProperty("--skin-dark", SKINS[npc.skin].dark);
    el.style.setProperty("--outfit", npc.outfit);
    if (npc.pagne) el.style.setProperty("--pagne", npc.pagne);
    if (npc.wrap) el.style.setProperty("--wrap", npc.wrap);
    if (npc.tie) el.style.setProperty("--tie", npc.tie);
  });
}

function showSet(scene) {
  document.querySelectorAll("[data-set]").forEach((el) => {
    el.style.display = el.dataset.set === scene.set ? "inline" : "none";
  });
  document.querySelectorAll("[data-npc]").forEach((el) => {
    el.style.display = scene.npcs?.includes(el.dataset.npc) ? "inline" : "none";
  });
}

async function transitionTo(scene, label = scene.place, time = sceneTime(scene)) {
  els.transitionIcon.textContent = scene.icon ?? "";
  els.transitionPlace.textContent = label.replace(/^📍\s*/, "");
  els.transitionTime.textContent = time;
  els.transitionTime.hidden = !time;
  els.transition.classList.add("is-on");
  await wait(550);
  if (scene.set) {
    resetWorld();
    showSet(scene);
  }
  await wait(1100);
  els.transition.classList.remove("is-on");
  await wait(350);
}

const sceneTime = (scene) => (flags.late && scene.lateTime) || scene.time;

function createChip(text, tone) {
  const chip = document.createElement("span");
  chip.className = `chip ${tone}`;
  chip.textContent = text;
  return chip;
}

function renderChoices(scene) {
  els.choices.innerHTML = "";

  scene.choices.forEach((choice, i) => {
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

    const affordable = state.argent + (choice.effects.argent ?? 0) >= 0;
    const effects = document.createElement("span");
    effects.className = "choice__effects";
    if (!affordable) effects.appendChild(createChip("🔒 Pas assez de wari", "lock"));
    if (!choice.effects.argent) effects.appendChild(createChip("Gratuit", "pos"));
    Object.entries(choice.effects)
      .filter(([, delta]) => delta !== 0)
      .forEach(([key, delta]) => {
        const text = key === "argent" ? formatDelta(key, delta) : `${STATS[key].icon} ${formatDelta(key, delta)}`;
        effects.appendChild(createChip(text, deltaClass(delta)));
      });

    body.append(label, quip, effects);
    btn.append(icon, body);
    btn.disabled = !affordable;
    btn.addEventListener("click", () => handleChoice(scene, choice));
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
  els.recap.innerHTML = items;
  if (advice) {
    const p = document.createElement("p");
    p.className = "advice";
    p.innerHTML = `<span><strong>Vieux Père${NBSP}:</strong> ${advice}</span>`;
    p.prepend(document.querySelector(".dialog__portrait").cloneNode(true));
    els.recap.appendChild(p);
  }
  els.recap.hidden = false;
}

function renderButton(text, onClick, extra) {
  els.choices.innerHTML = "";
  if (extra) els.choices.appendChild(extra);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn--play btn--block";
  btn.textContent = text;
  btn.addEventListener("click", onClick, { once: true });
  els.choices.appendChild(btn);
  btn.scrollIntoView({ behavior: SPEED < 1 ? "auto" : "smooth", block: "end" });
}

async function playScene(index, { transition = true } = {}) {
  busy = true;
  sceneIndex = index;
  const scene = life().day[index];

  els.recap.hidden = true;
  els.choices.innerHTML = "";
  els.dialogText.textContent = "";
  if (transition) await transitionTo(scene);
  else showSet(scene);

  els.clock.textContent = sceneTime(scene);
  els.clockIcon.textContent = scene.clockIcon ?? "☀️";
  setSpeaker(SPEAKERS.narrator, scene.place);
  if (scene.intro) await sceneIntros[scene.intro]();

  await typeText(scene.text(flags));
  renderChoices(scene);
  busy = false;
}

async function handleChoice(scene, choice) {
  if (busy) return;
  busy = true;

  els.choices.innerHTML = "";
  setSpeaker(SPEAKERS.narrator, `${choice.icon} ${choice.label}`);
  els.dialogText.textContent = "…";

  if (choice.cinematic) await cinematics[choice.cinematic]();
  else if (choice.reaction) await react(scene, choice.reaction);

  Object.assign(flags, choice.flags);
  if (choice.time) els.clock.textContent = choice.time;
  const applied = applyEffects(choice.effects);
  renderHud(applied);
  await typeText(choice.result());
  showRecap(applied, choice.advice());

  const last = sceneIndex === life().day.length - 1;
  renderButton(last ? "🌙 Fin de la journée" : "Continuer ➜", () => (last ? endOfDay() : playScene(sceneIndex + 1)));
  busy = false;
}

async function endOfDay() {
  busy = true;
  els.recap.hidden = true;
  els.choices.innerHTML = "";
  els.dialogText.textContent = "";
  await transitionTo({ icon: "🌙" }, life().end.place, "");

  setSpeaker(SPEAKERS.guide);
  await typeText(life().end.text());

  const totals = Object.fromEntries(Object.keys(STATS).map((key) => [key, state[key] - life().start[key]]));
  showRecap(totals);

  const teaser = document.createElement("p");
  teaser.className = "teaser";
  teaser.textContent = `📺 Prochain épisode${NBSP}: ${life().end.next}`;
  renderButton("🔁 Rejouer la journée", restart, teaser);
  busy = false;
}

function resetWorld() {
  [els.hero, els.gbaka, els.yango, els.dim, els.sun].forEach((el) => {
    el.getAnimations().forEach((a) => a.cancel());
  });
  els.hero.classList.remove("walking");
  els.gbakaBubble.classList.remove("is-on");
  els.zzz.classList.remove("is-on");
  els.officeScreen.classList.remove("is-off");
  els.world.querySelectorAll(".emote").forEach((el) => el.remove());
  hideToast();
}

function restart() {
  if (busy) return;
  state = { ...life().start };
  Object.keys(flags).forEach((key) => delete flags[key]);
  renderHud();
  playScene(0);
}

async function play() {
  els.titleScreen.classList.add("is-hidden");
  els.game.classList.remove("is-title");
  if (!introDone) await runIntro();
  playScene(0, { transition: false });
}


els.hero.innerHTML = heroMarkup();
els.previewHero.innerHTML = heroMarkup();
setupCast();
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
