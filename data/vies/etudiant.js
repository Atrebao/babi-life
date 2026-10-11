const LIFE_ETUDIANT = {
  start: { argent: 5000, energie: 100, sante: 100, respect: 50, moyenne: 10 },

  day: [
    {
      id: "arret",
      set: "yop",
      props: ["arret"],
      npcs: ["q1", "q2", "q3", "q4", "q5", "q6"],
      place: "📍 Arrêt de bus · Yopougon",
      icon: "🚏",
      time: "06:00",
      intro: "busPasses",
      text: () =>
        `${player.name}, 6h du matin. Il y a déjà 200 personnes à l'arrêt. Le bus arrive… complètement plein. Il passe sans s'arrêter. Quelqu'un dans la file dit${NBSP}: «${NBSP}Il y en a un autre dans 1h. Peut-être.${NBSP}»`,
      choices: [
        {
          id: "attendre",
          icon: "⏳",
          label: "Attendre le prochain bus",
          quip: "Réviser debout, c'est réviser quand même",
          time: "07:40",
          flags: { late: true },
          effects: { energie: -20, moyenne: 1 },
          reaction: ["😩", "🥱"],
          result: () =>
            "Le prochain bus est arrivé à 7h40. Tu as révisé tout ton cours debout dans la file. Tes jambes sont fatiguées, mais ta tête est prête.",
          advice: () => "À Babi, l'étudiant qui arrive à l'heure, c'est celui qui s'est levé avant le bus.",
        },
        {
          id: "woro",
          icon: "🚖",
          label: "Prendre un woro-woro",
          quip: "Le prix change selon l'humeur du chauffeur",
          time: "06:40",
          cinematic: "woro",
          effects: { argent: -500, energie: -10 },
          result: () =>
            `Hier c'était 300. Aujourd'hui le chauffeur dit${NBSP}: «${NBSP}C'est 500, c'est le carburant.${NBSP}» Le carburant a augmenté depuis hier soir${NBSP}? Bon… au moins tu es à l'heure.`,
          advice: () => "À Babi, les prix montent en ascenseur. La bourse, elle, prend l'escalier.",
        },
        {
          id: "courir",
          icon: "🏃",
          label: "Courir après le bus",
          quip: "Mode film d'action activé",
          time: "06:30",
          cinematic: "chase",
          effects: { energie: -30, respect: 15 },
          result: () =>
            `Tu t'es ${g("accroché", "accrochée")} à la porte comme dans un film d'action. Tout l'arrêt t'a applaudi${g("", "e")}. Tu es à l'heure… mais une chaussure est restée à Yop.`,
          advice: () => "Le courage, c'est bien. Mais la prochaine fois, attache bien tes lacets.",
        },
      ],
    },

    {
      id: "amphi",
      set: "amphi",
      npcs: ["s1", "s2", "delegue"],
      place: "📍 Amphi A · Fac de Cocody",
      icon: "🏛️",
      time: "07:30",
      lateTime: "07:50",
      text: (flags) =>
        `${flags.late ? "Tu arrives à 7h50." : "7h30."} L'amphi de 500 places est rempli à 1${NBSP}500. Des étudiants sont assis par terre, sur les marches, même sur le rebord des fenêtres. Et Junior t'envoie un message${NBSP}: «${NBSP}Garde-moi une place stp 🙏${NBSP}»`,
      choices: [
        {
          id: "fenetre",
          icon: "🪟",
          label: "S'asseoir sur la fenêtre",
          quip: "Vue sur le campus, klaxons inclus",
          effects: { energie: -10, moyenne: 1 },
          reaction: ["😅", "👍"],
          result: () =>
            "Tu entends le cours… et le vendeur d'eau en bas, et le klaxon du bus, et le coq de la cité. Mais tu entends le cours.",
          advice: () => `Une place à l'amphi, c'est comme une place dans le gbaka${NBSP}: faut pas dormir.`,
        },
        {
          id: "junior",
          icon: "🎒",
          label: "Garder la place de Junior avec ton sac",
          quip: "L'amitié, ça coûte cher",
          effects: { respect: -10, moyenne: 2 },
          reaction: ["😬", "😤"],
          result: () =>
            `Trois personnes t'ont ${g("menacé", "menacée")}. Junior est arrivé à 10h en disant${NBSP}: «${NBSP}Le prof n'est pas encore là${NBSP}?${NBSP}» Au moins, toi tu étais ${g("assis", "assise")} devant.`,
          advice: () => "Aider un ami c'est bien. Mais l'ami qui arrive toujours à 10h, il faut lui parler.",
        },
        {
          id: "debout",
          icon: "🧍",
          label: "Rester debout au fond",
          quip: "Les jambes vont porter plainte",
          effects: { energie: -20, moyenne: 1 },
          reaction: ["😮‍💨", "🤷"],
          result: () => "Tu as pris tout le cours debout. Tes jambes demandent un congé maladie.",
          advice: () => "Debout ou assis, ce qui compte, c'est ce qui rentre dans la tête.",
        },
      ],
    },

    {
      id: "absent",
      set: "amphi",
      npcs: ["delegue", "s1", "s2"],
      place: "📍 Amphi A · Fac de Cocody",
      icon: "⏳",
      time: "09:30",
      text: () =>
        `Ça fait 2h que vous attendez Dr Yao. Le Délégué crie pour la 4e fois${NBSP}: «${NBSP}Il arrive${NBSP}! Il est à Adjamé${NBSP}!${NBSP}» Il était déjà à Adjamé il y a une heure.`,
      choices: [
        {
          id: "patienter",
          icon: "⏳",
          label: "Attendre encore",
          quip: "Peut-être qu'il est vraiment à Adjamé",
          effects: { energie: -15, moyenne: 2 },
          reaction: ["🥱", "📣"],
          result: () =>
            `Dr Yao est arrivé à 11h45. Cours de 15 minutes. «${NBSP}Le reste est dans le polycopié.${NBSP}» Tu sens venir la suite…`,
          advice: () => "Celui qui attend n'est pas toujours récompensé. Mais celui qui part rate toujours quelque chose.",
        },
        {
          id: "biblio",
          icon: "📚",
          label: "Aller réviser à la bibliothèque",
          quip: "Le seul endroit avec la clim",
          effects: { energie: 5, moyenne: 1 },
          reaction: ["😌", "🤷"],
          result: () => "Il y avait la clim. Tu as dormi 1h sur ton cahier. Mais tu as quand même lu 2 pages… en dormant.",
          advice: () => "La bibliothèque, c'est pour lire. Le lit, c'est pour dormir. Faut pas mélanger.",
        },
        {
          id: "garba",
          icon: "🍛",
          label: "Aller manger un garba",
          quip: "Le ventre aussi doit étudier",
          effects: { argent: -300, energie: 20, moyenne: -1 },
          reaction: ["😋", "📣"],
          result: () =>
            "Pendant ton garba, Dr Yao est arrivé et il a donné le sujet de l'exam. Tu l'as appris sur le groupe WhatsApp, la bouche pleine de piment.",
          advice: () => "À la fac, le prof arrive toujours au moment où tu pars.",
        },
      ],
    },

    {
      id: "poly",
      set: "cabine",
      npcs: ["vendeuse", "doc"],
      place: "📍 Cabine photocopie · Campus",
      icon: "🖨️",
      time: "12:00",
      text: () =>
        `Dr Yao a dit${NBSP}: «${NBSP}Tout l'examen est dans mon polycopié.${NBSP}» Le poly coûte 3${NBSP}000 F. Il fait 40 pages, dont 15 floues. Il te reste ${formatMoney(state.argent)}. Et Doc, en 7e année de licence, te fait signe.`,
      choices: [
        {
          id: "acheter",
          icon: "💸",
          label: "Acheter le polycopié",
          quip: "Le savoir a un prix : 3 000 F",
          effects: { argent: -3000, moyenne: 3 },
          reaction: ["😮‍💨", "🤑"],
          result: () => "15 pages floues, et les 25 autres c'est le cours de l'année passée. Mais au moins, tu l'as.",
          advice: () => `Le savoir n'a pas de prix. Mais à la fac, apparemment, il coûte 3${NBSP}000 F.`,
        },
        {
          id: "photo",
          icon: "📸",
          label: "Photographier le poly d'un camarade",
          quip: "Ta galerie va devenir une bibliothèque",
          effects: { argent: -100, moyenne: 2, respect: -5 },
          reaction: ["📸", "😒"],
          result: () =>
            "Ton téléphone est plein de photos de poly. Ta galerie ressemble à une bibliothèque, et il n'y a plus de place pour tes selfies.",
          advice: () => "La débrouille, c'est bien. Mais garde un peu de mémoire pour toi aussi.",
        },
        {
          id: "doc",
          icon: "🧓",
          label: "Demander à Doc ses vieilles notes",
          quip: "7 ans de notes, ça doit servir",
          npc: "doc",
          effects: { moyenne: 1, respect: 5 },
          reaction: ["🙏", "😎"],
          result: () =>
            `Doc a toutes les notes depuis 7 ans, avec les corrections du prof d'avant Dr Yao. Il t'a aussi donné ses conseils pour «${NBSP}réussir du premier coup${NBSP}». Depuis sa 7e année.`,
          advice: () => "Écoute les anciens. Mais regarde aussi où ils sont arrivés.",
        },
      ],
    },

    {
      id: "cite",
      set: "cite",
      npcs: ["cousin"],
      place: "📍 Cité U · Chambre 214",
      icon: "🏚️",
      clockIcon: "🌙",
      time: "21:00",
      intro: "citeBlackout",
      text: () =>
        `TD à rendre demain à 8h. Tu ouvres ton cahier… délestage${NBSP}! Toute la cité est dans le noir. Bamba ronfle déjà, et le cousin «${NBSP}de passage${NBSP}» depuis 2 ans mange ton pain.`,
      choices: [
        {
          id: "lampe",
          icon: "🔦",
          label: "Travailler à la lampe du téléphone",
          quip: "Batterie 12 %, courage 100 %",
          effects: { energie: -25, moyenne: 3, sante: -5 },
          reaction: ["🔦", "🥖"],
          result: () => "TD fini à 2h du matin. Téléphone à 1 %. Tes yeux aussi.",
          advice: () => "Le délestage coupe le courant, pas le courage.",
        },
        {
          id: "lampadaire",
          icon: "💡",
          label: "Aller travailler sous le lampadaire",
          quip: "Le bureau gratuit de la cité",
          effects: { energie: -15, moyenne: 2, respect: 10 },
          reaction: ["🤝", "🥖"],
          result: () =>
            `Il y avait déjà 30 étudiants sous le même lampadaire. Vous avez fait le TD ensemble. La solidarité de Babi${NBSP}!`,
          advice: () => "Seul on va vite, ensemble on va loin. Surtout sous un lampadaire.",
        },
        {
          id: "copier",
          icon: "😴",
          label: "Dormir et copier le TD demain",
          quip: "Le plan parfait… ou pas",
          effects: { energie: 20, moyenne: -2 },
          reaction: ["😴", "🤭"],
          result: () => "Cinq personnes ont copié le même TD. Avec les mêmes fautes. Dr Yao a tout vu.",
          advice: () => "Copier c'est rapide. Mais à l'exam, ta tête sera seule.",
        },
      ],
    },
  ],

  end: {
    place: "🌙 Fin de la journée",
    next: "Babi de jour… et de nuit 🌙",
    text: () => {
      const m = state.moyenne;
      const parts = [`${player.name}, ta première journée à la fac est finie.`];

      if (m >= 13) parts.push(`Avec ${m}/20, tu es ${g("parti", "partie")} pour le diplôme. Papa peut déjà préparer la fête au village.`);
      else if (m >= 10) parts.push(`${m}/20. C'est juste, mais ça passe. Comme le bus de 7h40.`);
      else parts.push(`${m}/20… le rattrapage t'attend. Papa ne doit pas savoir.`);

      if (state.argent <= 1000) parts.push("Ton porte-monnaie est plus vide que le frigo de la cité U.");
      if (state.energie <= 30) parts.push("Ce soir, même le ronflement de Bamba ne va pas te réveiller.");

      parts.push("Demain, le bus t'attend encore… peut-être.");
      return parts.join(" ");
    },
  },
};
