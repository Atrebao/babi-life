# Roadmap — Babi Life

Une version = un épisode TikTok. Chaque version se termine par un tag Git et une entrée dans le CHANGELOG.

## Règles de commit

Format : `type: description courte` ([Conventional Commits](https://www.conventionalcommits.org/fr/))

| Type | Usage |
|------|-------|
| `feat` | nouvelle fonctionnalité du jeu |
| `fix` | correction de bug |
| `style` | visuel / UI sans changement de logique |
| `refactor` | réorganisation du code sans changement visible |
| `docs` | README, ROADMAP, CHANGELOG |
| `chore` | config, outillage, version |

Fin de version :

```bash
git commit -m "chore: version 0.3.0"
git tag -a v0.3.0 -m "v0.3.0 — Une journée à Babi"
git push origin main --tags
```

## ✅ Déjà sorti

- **v0.1.0 — Prototype** : 4 jauges, une situation, 3 choix
- **v0.2.0 — Refonte 2D** : scène animée de Yopougon, intro avec Vieux Père Ali, création du perso, tutoriel, vannes en nouchi

## 🔜 À venir

### v0.3.0 — Une journée à Babi
*Épisode : « Ton perso doit survivre à toute une journée »*
- `refactor: sépare les situations dans un fichier data/scenes.js`
- `feat: moteur de scènes qui enchaîne les situations`
- `feat: scène Plateau — la réunion avec le boss`
- `feat: scène midi — garba ou alloco ?`
- `feat: scène soir — maquis avec les gars`
- `feat: transitions entre les scènes (fondu + nom du quartier)`

### v0.4.0 — Le temps qui passe
*Épisode : « J'ai ajouté le jour et la nuit à mon jeu »*
- `feat: horloge qui avance à chaque choix`
- `style: ciel qui change matin / midi / soir / nuit`
- `feat: lampadaires et fenêtres allumées la nuit`
- `feat: écran bilan de fin de journée`

### v0.5.0 — Game over
*Épisode : « Peux-tu tenir 7 jours à Abidjan ? »*
- `feat: game over si Argent, Énergie ou Santé tombe à 0`
- `feat: compteur de jours et meilleur score`
- `feat: carte bilan à partager (capture pour TikTok)`

### v0.6.0 — Son & ambiance
*Épisode : « J'ai mis du coupé-décalé dans mon jeu »*
- `feat: musique d'ambiance et bouton son on/off`
- `feat: bruitages (klaxon, moteur gbaka, notification)`
- `feat: vibration au téléphone sur les gros événements`

### v0.7.0 — Sauvegarde
- `feat: sauvegarde automatique de la partie`
- `feat: bouton Continuer sur l'écran titre`

### v0.8.0 — Les communes
*Épisode : « Yop, Cocody ou Abobo : où vivre ? »*
- `feat: carte d'Abidjan avec les quartiers`
- `feat: scènes Cocody, Treichville, Marcory, Abobo`
- `feat: choix du quartier de départ (prix et ambiance différents)`

### v0.8.5 — Gombo & logement
*Épisode : « Trouver un travail à Babi, c'est pas facile »*
- `feat: chercher un travail (vendeur, chauffeur woro-woro, informaticien…)`
- `feat: salaire et gombos à côté`
- `feat: louer une chambre, un studio, puis une villa à Cocody`

### v0.9.0 — Imprévus
*Épisode : « Les galères de Babi dans mon jeu »*
- `feat: événements aléatoires (coupure de courant, pluie, contrôle de police, panne de gbaka)`
- `feat: objets à acheter (téléphone, moto, costume)`

### v1.0.0 — Lancement public
*Épisode : « Mon jeu est jouable, lien en bio »*
- `feat: PWA installable sur le téléphone`
- `chore: déploiement GitHub Pages`
- `feat: plus d'options de personnalisation (coiffure, tenue, accessoires)`

### v1.x — Babi en ligne
*Comme Lagos Life : jouer avec les autres*
- `feat: compte joueur et sauvegarde en ligne`
- `feat: voir les autres joueurs dans le quartier`
- `feat: classement des plus grands boucantiers`

## 💡 Idées en vrac

- Réputation par quartier
- Mini-jeux (négocier avec l'apprenti, esquiver les nids de poule)
- Choix proposés par les abonnés TikTok
