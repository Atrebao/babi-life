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
