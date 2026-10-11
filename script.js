const MONEY_BAR_MAX = 20000;

const LABELS = {
  argent: "Argent",
  energie: "Énergie",
  sante: "Santé",
  respect: "Respect",
};

const state = {
  argent: 10000,
  energie: 100,
  sante: 100,
  respect: 50,
};

const situation = {
  place: "📍 Yopougon",
  time: "07:00",
  text: "Tu te réveilles à Yopougon, il est 7h. Tu as une réunion importante au Plateau mais il y a un giga embouteillage. Que fais-tu ?",
  choices: [
    {
      label: "🚐 Prendre le Gbaka",
      effects: { argent: -500, energie: -30, respect: 5 },
      result: "Serré comme des sardines, mais t'es arrivé à l'heure.",
    },
    {
      label: "🚗 Prendre un Yango",
      effects: { argent: -4000, energie: 0, respect: 20 },
      result: "Clim, musique, arrivée en boss. Le patron a remarqué.",
    },
    {
      label: "😴 Rester dormir",
      effects: { argent: 0, energie: 20, respect: -40 },
      result: "Bien reposé… mais ton téléphone affiche 12 appels manqués.",
    },
  ],
};

const els = {
  clock: document.getElementById("clock"),
  place: document.getElementById("place"),
  story: document.getElementById("story-text"),
  feedback: document.getElementById("feedback"),
  choices: document.getElementById("choices"),
};

const formatMoney = (n) => `${n.toLocaleString("fr-FR")} F`;
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

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

function renderStats(changed = {}) {
  Object.keys(state).forEach((key) => {
    const value = state[key];
    const valueEl = document.getElementById(`val-${key}`);
    const barEl = document.getElementById(`bar-${key}`);
    const percent = key === "argent" ? (value / MONEY_BAR_MAX) * 100 : value;

    valueEl.textContent = key === "argent" ? formatMoney(value) : value;
    barEl.style.width = `${clamp(percent, 0, 100)}%`;

    valueEl.classList.remove("up", "down");
    if (changed[key] > 0) valueEl.classList.add("up");
    if (changed[key] < 0) valueEl.classList.add("down");
  });

  setTimeout(() => {
    document.querySelectorAll(".stat__value").forEach((el) => el.classList.remove("up", "down"));
  }, 1200);
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

function showFeedback(choice, applied) {
  const rows = Object.keys(state)
    .map((key) => {
      const delta = applied[key] ?? 0;
      const value = key === "argent" ? formatMoney(state[key]) : `${state[key]}/100`;
      return `<li><span>${LABELS[key]} : <strong>${value}</strong></span><span class="${deltaClass(delta)}">${formatDelta(key, delta)}</span></li>`;
    })
    .join("");

  els.feedback.innerHTML = `
    <p class="feedback__title">${choice.result}</p>
    <ul class="feedback__list">${rows}</ul>
  `;
  els.feedback.hidden = false;
}

function createTag(key, delta) {
  const tag = document.createElement("span");
  tag.className = `tag ${delta > 0 ? "pos" : delta < 0 ? "neg" : ""}`;
  tag.textContent = `${LABELS[key]} ${formatDelta(key, delta)}`;
  return tag;
}

function renderChoices() {
  els.choices.innerHTML = "";

  situation.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";

    const label = document.createElement("span");
    label.className = "choice__label";
    label.textContent = choice.label;

    const effects = document.createElement("span");
    effects.className = "choice__effects";
    Object.entries(choice.effects).forEach(([key, delta]) => effects.appendChild(createTag(key, delta)));

    btn.append(label, effects);
    btn.disabled = state.argent + (choice.effects.argent ?? 0) < 0;
    btn.addEventListener("click", () => handleChoice(choice));
    els.choices.appendChild(btn);
  });
}

function renderReplay() {
  els.choices.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "choice choice--primary";
  btn.type = "button";
  btn.innerHTML = `<span class="choice__label">🔁 Rejouer la situation</span>`;
  btn.addEventListener("click", startSituation);
  els.choices.appendChild(btn);
}

function handleChoice(choice) {
  const applied = applyEffects(choice.effects);
  renderStats(applied);
  showFeedback(choice, applied);
  renderReplay();
}

function startSituation() {
  els.clock.textContent = situation.time;
  els.place.textContent = situation.place;
  els.story.textContent = situation.text;
  els.feedback.hidden = true;
  renderChoices();
}

renderStats();
startSituation();
