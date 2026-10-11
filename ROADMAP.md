# Roadmap — Babi Life

Une version = un épisode TikTok. Chaque version apporte **une seule grosse nouveauté** facile à montrer en vidéo, se termine par un tag Git et une entrée dans le CHANGELOG.

## Ton & écriture

Le jeu reste **drôle avant tout**. L'humour ivoirien sert à montrer les réalités de la vie à Babi (embouteillages, délestage, prix qui montent, files d'attente, amphis bondés…) : on en rit pour mieux les dénoncer.

- On parle comme à Babi : nouchi, expressions du quotidien, Vieux Père Ali comme narrateur
- On se moque des situations, jamais d'une ethnie, d'une religion ou d'une personne réelle
- Chaque choix a une conséquence drôle **et** une petite vérité (le conseil du Vieux Père)
- Les textes s'accordent selon que le joueur est un gars ou une go

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

Fin de version (exemple pour la v0.4.0) :

```bash
# 1. mettre VERSION = "0.4.0" dans script.js et compléter CHANGELOG.md
git commit -am "chore: version 0.4.0"
git tag -a v0.4.0 -m "v0.4.0 — Une journée à Babi"
git push origin main --tags
```

## ✅ Déjà sorti

| Version | Nouveauté | Épisode |
|---------|-----------|---------|
| v0.1.0 | Prototype : 4 jauges, une situation, 3 choix | « Je crée le Lagos Life ivoirien » |
| v0.2.0 | Refonte 2D : scène animée de Yopougon, gbaka, Yango | « Mon jeu ressemblait à un formulaire, regardez maintenant » |
| v0.3.0 | Vieux Père Ali, création du perso, tutoriel, vannes en nouchi | « Créez votre perso de Babi » |

## 🔜 À venir

### v0.4.0 — Une journée à Babi
*Épisode : « Ton perso doit survivre à toute une journée »*
- `refactor: sépare les situations dans un fichier data/scenes.js`
- `feat: moteur de scènes qui enchaîne les situations`
- `feat: scène Plateau — la réunion avec le boss`
- `feat: scène midi — garba ou alloco ?`
- `feat: scène soir — maquis avec les gars`
- `feat: transitions entre les scènes (fondu + nom du quartier)`

### v0.5.0 — La vie d'étudiant
*Épisode : « Étudiant à Babi : le mode le plus difficile du jeu » (cible : les étudiants de Cocody, Abobo-Adjamé, Bouaké…)*
- `feat: choix du statut sur la carte d'identité — Travailleur ou Étudiant(e)`
- `feat: nouvelle jauge 📚 Moyenne pour le mode étudiant`
- `feat: scène arrêt de bus — la file d'attente qui ne bouge pas, le bus déjà plein qui passe sans s'arrêter`
- `feat: woro-woro dont le prix augmente sans prévenir (« C'est 300 maintenant, c'est le carburant »)`
- `feat: scène amphi bondé — assis par terre, sur la fenêtre, ou garder la place d'un ami`
- `feat: prof absent après 2h d'attente`
- `feat: TD à rendre vs délestage pendant les révisions`
- `feat: cité U — chambre partagée, cotisation pour le gaz`
- `feat: bourse qui tarde et budget garba de fin de mois`
- `feat: polycopiés à acheter et photocopie du cours d'un camarade`
- `feat: jour d'exam — réviser toute la nuit ou dormir ?`

### v0.6.0 — Le jour et la nuit
*Épisode : « J'ai ajouté le jour et la nuit à mon jeu »*
- `feat: horloge qui avance à chaque choix`
- `style: ciel qui change matin / midi / soir / nuit`
- `feat: lampadaires et fenêtres allumées la nuit`
- `feat: écran bilan de fin de journée`

### v0.7.0 — Survivre 7 jours
*Épisode : « Peux-tu tenir 7 jours à Abidjan ? » (défi pour les abonnés)*
- `feat: game over si Argent, Énergie ou Santé tombe à 0 (ou Moyenne pour les étudiants)`
- `feat: compteur de jours et meilleur score`
- `feat: événements aléatoires (délestage, pluie, contrôle de police, panne de gbaka, grève)`
- `feat: carte bilan à partager (capture pour TikTok)`
- `feat: sauvegarde automatique de la partie`

### v0.8.0 — Gombo, logement & communes
*Épisode : « Trouver un travail et un logement à Babi, c'est pas facile »*
- `feat: chercher un travail (vendeur, chauffeur woro-woro, informaticien…) ou un petit job d'étudiant`
- `feat: salaire et gombos à côté`
- `feat: louer une chambre à Yop, un studio, puis une villa à Cocody`
- `feat: carte d'Abidjan avec les quartiers (Cocody, Treichville, Marcory, Abobo)`
- `feat: débloque le choix du quartier sur la carte d'identité`
- `feat: objets à acheter (téléphone, moto, costume)`

### v0.9.0 — Son & ambiance
*Épisode : « J'ai mis du coupé-décalé dans mon jeu »*
- `feat: musique d'ambiance et bouton son on/off`
- `feat: bruitages (klaxon, moteur gbaka, notification)`
- `feat: vibration du téléphone sur les gros événements`

### v1.0.0 — Lancement public
*Épisode : « Mon jeu est jouable, lien en bio »*
- `feat: PWA installable sur le téléphone`
- `feat: plus d'options de personnalisation (coiffure, tenue, accessoires)`
- `chore: page de partage (aperçu du lien sur WhatsApp / TikTok)`

### v1.x — Babi en ligne
*Comme Lagos Life : jouer avec les autres*
- `feat: compte joueur et sauvegarde en ligne`
- `feat: voir les autres joueurs dans le quartier`
- `feat: classement des plus grands boucantiers`

## 💡 Idées en vrac

- Réputation par quartier
- Mini-jeux (négocier avec l'apprenti, esquiver les nids de poule)
- Choix proposés par les abonnés TikTok en commentaire
