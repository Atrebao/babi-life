# Roadmap — Babi Life

Une version = un épisode TikTok. Chaque version apporte **une seule grosse nouveauté** facile à montrer en vidéo, se termine par un tag Git et une entrée dans le CHANGELOG.

## Ton & écriture

Le jeu reste **drôle avant tout**. L'humour ivoirien sert à montrer les réalités de la vie à Babi (embouteillages, délestage, prix qui montent, files d'attente, amphis bondés…) : on en rit pour mieux les dénoncer.

- On parle comme à Babi : nouchi, expressions du quotidien, Vieux Père Ali comme narrateur
- On se moque des situations, jamais d'une ethnie, d'une religion ou d'une personne réelle
- **Aucun sujet sur l'État, la politique ou les autorités** (police, mairie…). C'est un jeu : on reste sur le quotidien des gens. Restent autorisés comme galères du quotidien : le délestage, la bourse, les gnambros
- Avec les petits métiers (apprentis, djassamans…), on rit **avec** eux, pas **d'eux** : ce sont les débrouillards de Babi
- Chaque choix a une conséquence drôle **et** une petite vérité (le conseil du Vieux Père)
- Les textes s'accordent selon que le joueur est un gars ou une go

## Les vies et leurs scénarios

Chaque vie a son univers complet (lieux, personnages, gags, scénarios) dans [docs/vies/](docs/vies/README.md) :
[💼 Travailleur](docs/vies/travailleur.md) · [🎓 Étudiant](docs/vies/etudiant.md) · [🚐 Apprenti](docs/vies/apprenti.md) · [📦 Djassaman](docs/vies/djassaman.md)

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

Fin de version (exemple pour la v0.6.0) :

```bash
# 1. mettre VERSION = "0.6.0" dans script.js et compléter CHANGELOG.md
git commit -am "chore: version 0.6.0"
git tag -a v0.6.0 -m "v0.6.0 — Le jour et la nuit"
git push origin main --tags
```

## ✅ Déjà sorti

| Version | Nouveauté | Épisode |
|---------|-----------|---------|
| v0.1.0 | Prototype : 4 jauges, une situation, 3 choix | « Je crée le Lagos Life ivoirien » |
| v0.2.0 | Refonte 2D : scène animée de Yopougon, gbaka, Yango | « Mon jeu ressemblait à un formulaire, regardez maintenant » |
| v0.3.0 | Vieux Père Ali, création du perso, tutoriel, vannes en nouchi | « Créez votre perso de Babi » |
| v0.4.0 | Une journée complète : réunion, garba, kpakpato, maquis | « Ton perso doit survivre à toute une journée » |
| v0.5.0 | La vie d'étudiant : bus plein, amphi bondé, prof absent, poly, cité U | « Étudiant à Babi : le mode le plus difficile du jeu » |

## 🔜 À venir

### v0.6.0 — Le jour et la nuit
*Épisode : « J'ai ajouté le jour et la nuit à mon jeu »*
- `feat: horloge qui avance à chaque choix`
- `style: ciel qui change matin / midi / soir / nuit`
- `feat: lampadaires et fenêtres allumées la nuit`
- `feat: écran bilan de fin de journée`

### v0.7.0 — La vie d'apprenti gbaka
*Épisode : « Cette fois, c'est toi l'apprenti » (on passe de l'autre côté du gbaka de la v0.2)*
- `feat: statut Apprenti sur la carte d'identité`
- `feat: nouvelle jauge 🎯 Versement — la recette à rendre au patron chaque soir`
- `feat: crier les destinations pour remplir le gbaka avant les autres`
- `feat: « Y'a pas monnaie » — rendre la monnaie… ou pas`
- `feat: client qui négocie le prix et client qui crie « À côté ! » au mauvais moment`
- `feat: Petit Ballo et le gbaka rival qui vole tes clients`
- `feat: les gnambros de la gare et leur « ticket » qui n'existe pas`
- `feat: la grosse pluie — le gbaka qui devient bateau`
- `feat: gbaka en panne, tout le monde descend pousser`
- `feat: réveil à 4h30, dodo sur la banquette`
- Scénarios : [apprenti.md](docs/vies/apprenti.md)

### v0.8.0 — Survivre 7 jours
*Épisode : « Peux-tu tenir 7 jours à Abidjan ? » (défi pour les abonnés)*
- `feat: game over si une jauge vitale tombe à 0 (Moyenne pour l'étudiant, Versement pour l'apprenti)`
- `feat: compteur de jours et meilleur score par statut`
- `feat: événements aléatoires (délestage, pluie, panne de gbaka, embouteillage monstre, visite surprise de la famille)`
- `feat: carte bilan à partager (capture pour TikTok)`
- `feat: sauvegarde automatique de la partie`
- `feat: les jours suivants — travailleur : le 25 du mois, la cotisation, la tontine ; étudiant : la bourse, la veille d'exam, les résultats`

### v0.9.0 — Son & ambiance
*Épisode : « J'ai mis du coupé-décalé dans mon jeu »*
- `feat: musique d'ambiance et bouton son on/off`
- `feat: bruitages (klaxon, moteur gbaka, cris de l'apprenti, notification)`
- `feat: vibration du téléphone sur les gros événements`

### v1.0.0 — Lancement public
*Épisode : « Mon jeu est jouable, lien en bio »*
Trois vies jouables (travailleur, étudiant, apprenti), une semaine à survivre, du son.
- `feat: PWA installable sur le téléphone`
- `feat: plus d'options de personnalisation (coiffure, tenue, accessoires)`
- `chore: page de partage (aperçu du lien sur WhatsApp / TikTok)`
- ✅ Jeu déjà en ligne sur GitHub Pages : https://atrebao.github.io/babi-life/

### v1.1.0 — La vie de djassaman
*Épisode : « Mise à jour 1.1 : les djassamans débarquent »*
- `feat: statut Djassaman sur la carte d'identité`
- `feat: nouvelle jauge 📦 Stock — la marchandise prise à crédit chez le grossiste d'Adjamé`
- `feat: mini-jeu — vendre dans l'embouteillage avant que le feu passe au vert`
- `feat: client qui démarre sans payer quand ça roule`
- `feat: choisir quoi vendre (eau, chargeurs, mouchoirs, cacahuètes…) selon la saison et la pluie`
- `feat: le cousin Bakary qui « garde » ton coin`
- `feat: la guerre des prix avec Petit Lion, arbitrée par Tantie Banane`
- `feat: négocier « prix de gros » avec un client qui ne veut qu'un seul paquet`
- Scénarios : [djassaman.md](docs/vies/djassaman.md)

### v1.2.0 — Gombo, logement & communes
*Épisode : « Trouver un travail et un logement à Babi, c'est pas facile »*
- `feat: changer de statut en cours de partie (l'apprenti qui devient chauffeur, l'étudiant qui trouve un stage…)`
- `feat: salaire et gombos à côté`
- `feat: louer une chambre à Yop, un studio, puis une villa à Cocody`
- `feat: carte d'Abidjan avec les quartiers (Cocody, Treichville, Marcory, Abobo)`
- `feat: débloque le choix du quartier sur la carte d'identité`
- `feat: objets à acheter (téléphone, moto, costume)`

### v2.0.0 — Babi en ligne
*Comme Lagos Life : jouer avec les autres*
- `feat: compte joueur et sauvegarde en ligne`
- `feat: voir les autres joueurs dans le quartier`
- `feat: classement des plus grands boucantiers`

## 💡 Idées en vrac

- Réputation par quartier
- Mini-jeux (négocier avec l'apprenti, esquiver les nids de poule)
- Autres vies à jouer : chauffeur de woro-woro, tantie garba, serveuse de maquis, gérant de cabine, coiffeur de quartier
- Choix proposés par les abonnés TikTok en commentaire
