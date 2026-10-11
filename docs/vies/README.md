# Les vies de Babi

Chaque vie est un univers complet : ses lieux, ses personnages, sa jauge à elle et ses galères du quotidien. On garde la même recette partout : **on rit des réalités de Babi pour mieux les dénoncer**, et on rit *avec* les gens, jamais *d'eux*.

| Vie | Jauge spéciale | Version | Fichier |
|-----|----------------|---------|---------|
| 💼 Travailleur | — (les 4 jauges de base) | v0.3 → v0.4 | [travailleur.md](travailleur.md) |
| 🎓 Étudiant(e) | 📚 Moyenne | v0.5 | [etudiant.md](etudiant.md) |
| 🚐 Apprenti gbaka | 🎯 Versement | v0.7 | [apprenti.md](apprenti.md) |
| 📦 Djassaman | 📦 Stock | v1.1 | [djassaman.md](djassaman.md) |

## Format d'un scénario

Chaque scénario suit le même modèle, pour être transformé facilement en données du jeu (`data/scenes.js`, prévu en v0.4) :

```
### N. Titre
📍 Lieu · heure

Situation : texte lu par le joueur

| Choix | Effets | Résultat |
|-------|--------|----------|
| 🚐 Choix 1 | 💰 −500 · ⚡ −30 · ⭐ +5 | Conséquence drôle |

👴🏾 Vieux Père : la petite vérité derrière la vanne
```

- **Effets** : 💰 Argent (FCFA) · ⚡ Énergie · ❤️ Santé · ⭐ Respect · plus la jauge spéciale de la vie
- **Accords** : `(e)` quand le texte change selon que le joueur est un gars ou une go
- **Prénom** : `{nom}` est remplacé par le prénom du joueur

## Règles d'écriture

1. Une situation = une vraie réalité de Babi que tout le monde reconnaît
2. Trois choix : en général un choix « débrouillard », un choix « boucantier » et un choix « fatigué »
3. Pas de choix parfait : chaque option coûte quelque chose
4. Le résultat fait rire, le conseil du Vieux Père fait réfléchir
5. Pas de vannes sur une ethnie, une religion ou une personne réelle
6. Aucun sujet sur l'État, la politique ou les autorités (police, mairie, administration…) : on reste sur le quotidien des gens
