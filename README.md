# Babi Life 🇨🇮

Mini-jeu de simulation de vie en 2D, pensé pour mobile, qui se passe à Abidjan.
Chaque choix du quotidien (gbaka, Yango, maquis…) fait bouger tes jauges : **Argent**, **Énergie**, **Santé** et **Respect**.

Inspiré de Lagos Life (Nigeria), mais avec la vie et les vannes de Babi.

Le projet est construit pas à pas, en public, sur TikTok : chaque version du jeu correspond à un épisode.

## ▶ Jouer

**https://atrebao.github.io/babi-life/** (mis à jour automatiquement à chaque envoi sur `main`)

## Jouer en local

Aucune installation : ouvre `index.html` dans un navigateur.
Pour tester en mode mobile, utilise les outils développeur de ton navigateur (vue appareil).

## Stack

- HTML, CSS, JavaScript natifs, sans framework ni build
- Scène 2D en SVG animée avec CSS et la Web Animations API
- Textes du jeu dans `data/` : `dialogues.js` (intro, tutoriel), `cast.js` (personnages) et `vies/` (une journée par vie : `travailleur.js`, `etudiant.js`)
- Univers et scénarios de chaque vie dans [docs/vies/](docs/vies/README.md)
- Polices : Baloo 2 et Nunito (Google Fonts)

## Versions

Chaque version est taguée (`v0.1.0`, `v0.2.0`…). Voir [CHANGELOG.md](CHANGELOG.md) pour le détail et [ROADMAP.md](ROADMAP.md) pour la suite.
