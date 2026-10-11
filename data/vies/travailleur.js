const LIFE_TRAVAILLEUR = {
  start: { argent: 10000, energie: 100, sante: 100, respect: 50 },

  day: [
    {
      id: "yop",
      set: "yop",
      place: "📍 Yopougon",
      icon: "🌅",
      time: "07:00",
      text: () =>
        `${player.name}, ton réveil sonne pour la 3e fois. Réunion importante au Plateau à 9h, mais dehors c'est giga embouteillage${NBSP}: même les piétons sont bloqués. On fait comment${NBSP}?`,
      choices: [
        {
          id: "gbaka",
          icon: "🚐",
          label: "Prendre le Gbaka",
          quip: "Pas cher, mais tu vas sentir la sueur des autres",
          time: "08:50",
          cinematic: "gbaka",
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
          cinematic: "yango",
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
          cinematic: "sleep",
          flags: { late: true },
          effects: { argent: 0, energie: 20, respect: -40 },
          result: () => `Tu as dormi comme un bébé. Mais au réveil${NBSP}: 12 appels manqués du boss. C'est gâté dêh${NBSP}!`,
          advice: () => `Dormir c'est bon. Mais le loyer, lui, il ne dort pas hein${NBSP}!`,
        },
      ],
    },

    {
      id: "reunion",
      set: "office",
      npcs: ["boss"],
      place: "📍 Plateau · Salle de réunion",
      icon: "🏢",
      time: "09:00",
      lateTime: "10:45",
      intro: "blackout",
      text: (flags) =>
        flags.late
          ? `Tu arrives à 10h45 en courant. Le boss regarde sa montre, puis toi, puis encore sa montre. Tu branches ta clé USB pour sauver la situation… et là${NBSP}: délestage. Tout le Plateau est dans le noir.`
          : `C'est l'heure de présenter ton rapport. Tu branches ta clé USB… et là${NBSP}: délestage${NBSP}! Tout le bâtiment est dans le noir. Le boss te regarde comme si c'était toi qui avais coupé le courant.`,
      choices: [
        {
          id: "memoire",
          icon: "🗣️",
          label: "Présenter de mémoire",
          quip: "Avec les gestes, comme un pasteur le dimanche",
          effects: { energie: -20, respect: 25 },
          reaction: ["🙌", "😮"],
          result: () =>
            `Tu as présenté tout le rapport dans le noir, avec les mains, la voix, tout. À la fin, le boss a dit «${NBSP}Amen${NBSP}» sans faire exprès.`,
          advice: () => "Le courant peut partir. Mais ce qui est dans ta tête, aucun délestage ne peut le couper.",
        },
        {
          id: "telephone",
          icon: "📱",
          label: "Montrer le rapport sur ton téléphone",
          quip: "Écran fissuré, batterie 3 %",
          effects: { energie: -5, respect: 5 },
          reaction: ["😬", "🧐"],
          result: () =>
            `Le boss a lu la moitié du rapport. L'autre moitié, c'était ta conversation WhatsApp avec ${g("ta go", "ton gars")}. Il a dit${NBSP}: «${NBSP}Intéressant…${NBSP}»`,
          advice: () => "Garde toujours ta batterie chargée. À Babi, on ne sait jamais quand le courant va revenir.",
        },
        {
          id: "stagiaire",
          icon: "🙈",
          label: "Dire que c'est la faute du stagiaire",
          quip: "Il est petit, il ne va rien dire… normalement",
          effects: { respect: -15 },
          reaction: ["😅", "😒"],
          result: () =>
            "Le stagiaire avait tout sauvegardé en double sur sa clé à lui. Il a présenté à ta place. Maintenant c'est lui le héros du bureau.",
          advice: () => "Le petit d'aujourd'hui, c'est le grand de demain. Faut jamais l'écraser.",
        },
      ],
    },

    {
      id: "garba",
      set: "garba",
      npcs: ["garba"],
      place: "📍 Chez Tantie Garba",
      icon: "🍛",
      time: "12:30",
      text: () =>
        `Ton ventre fait plus de bruit que le générateur de l'immeuble. Tantie Garba sort son cahier de crédit avant même que tu ouvres la bouche${NBSP}: «${NBSP}${g("Mon fils", "Ma fille")}, on mange quoi aujourd'hui${NBSP}?${NBSP}»`,
      choices: [
        {
          id: "complet",
          icon: "🐟",
          label: "Garba complet, gros piment",
          quip: "Le vrai repas des champions",
          effects: { argent: -1000, energie: 25, sante: -5 },
          reaction: ["🥵", "😄"],
          result: () =>
            "Tu as tellement transpiré que les collègues ont cru que tu sortais de la douche. Mais ton ventre chante le zouglou.",
          advice: () => "Le garba donne la force. Mais le piment, c'est demain matin qu'il va te parler.",
        },
        {
          id: "alloco",
          icon: "🍌",
          label: "Alloco simple",
          quip: "Petit prix, petit ventre",
          effects: { argent: -500, energie: 10 },
          reaction: ["😋", "🤨"],
          result: () =>
            `Petit ventre content, porte-monnaie aussi. Tantie Garba t'a regardé${g("", "e")} de haut en bas${NBSP}: «${NBSP}Toi tu fais régime ou bien${NBSP}?${NBSP}»`,
          advice: () => "Manger léger, c'est bien. Mais à 16h, ton ventre va réclamer sa part.",
        },
        {
          id: "cahier",
          icon: "📒",
          label: `«${NBSP}Tantie, mets ça dans le cahier${NBSP}»`,
          quip: "Gratuit aujourd'hui… pas demain",
          effects: { energie: 25, respect: -10 },
          reaction: ["😇", "📝"],
          result: () =>
            `Tantie Garba a écrit ton nom en rouge, avec un point d'exclamation. Même son fils t'appelle «${NBSP}Crédit${NBSP}» maintenant.`,
          advice: () => "Le cahier de Tantie Garba, c'est la seule banque de Babi qui prête sans papier. Mais elle n'oublie jamais.",
        },
      ],
    },

    {
      id: "bijou",
      set: "office",
      npcs: ["bijou"],
      place: "📍 Plateau · Bureau",
      icon: "👂",
      time: "14:00",
      text: () =>
        `Tantie Bijou t'attrape par le bras${NBSP}: «${NBSP}Viens, viens, j'ai une information… Il paraît qu'il y a des licenciements le mois prochain. Mais c'est entre nous hein${NBSP}!${NBSP}» Elle a dit «${NBSP}entre nous${NBSP}» à tout l'étage.`,
      choices: [
        {
          id: "ecouter",
          icon: "👂",
          label: "Écouter toute l'histoire",
          quip: "45 minutes de kpakpato garanties",
          effects: { energie: -10, respect: -5 },
          reaction: ["😱", "🤫"],
          result: () =>
            "45 minutes de rumeurs. Tu sais maintenant qui sort avec qui et qui a acheté sa voiture à crédit… mais toujours pas ton travail.",
          advice: () => "Celui qui vient te raconter les affaires des autres va raconter tes affaires aux autres.",
        },
        {
          id: "fuir",
          icon: "🏃",
          label: `«${NBSP}Pardon Tantie, le boss m'appelle${NBSP}»`,
          quip: "Fuir, c'est aussi une stratégie",
          effects: { respect: 10 },
          reaction: ["😅", "🤨"],
          result: () => `Tu as échappé${NBSP}! Mais demain, c'est sur toi que Tantie Bijou va raconter.`,
          advice: () => `Fuir le kpakpato, c'est bien. Mais fais attention${NBSP}: elle a une très bonne mémoire.`,
        },
        {
          id: "bosser",
          icon: "💼",
          label: "Aller travailler deux fois plus",
          quip: "Licenciement ou pas, on se montre",
          effects: { energie: -25, respect: 20 },
          reaction: ["💪", "🙄"],
          result: () =>
            `Le boss t'a vu${g("", "e")} travailler jusqu'à 18h. Tantie Bijou dit déjà à tout l'étage que tu «${NBSP}cherches à te faire voir${NBSP}».`,
          advice: () => "Le travail bien fait parle plus fort que toutes les rumeurs.",
        },
      ],
    },

    {
      id: "maquis",
      set: "maquis",
      npcs: ["collegue1", "collegue2"],
      place: `📍 Maquis «${NBSP}Le Temps des Boss${NBSP}»`,
      icon: "🍻",
        time: "19:00",
      text: () =>
        `Les collègues t'appellent${NBSP}: «${NBSP}On va s'enjailler un peu${NBSP}!${NBSP}» Il te reste ${formatMoney(state.argent)} jusqu'à la fin du mois. Au maquis, le premier qui dit «${NBSP}c'est moi qui paie${NBSP}» devient le roi de la soirée… et le pauvre du mois.`,
      choices: [
        {
          id: "table",
          icon: "👑",
          label: `«${NBSP}Serveuse, mets la table sur moi${NBSP}!${NBSP}»`,
          quip: "Roi de la soirée, pauvre du mois",
          effects: { argent: -6000, respect: 30, sante: -10 },
          reaction: ["😎", "🥳"],
          result: () =>
            `Tu es ${g("le boucantier", "la boucantière")} de la soirée. Les collègues ont chanté ton nom sur du coupé-décalé. Demain matin, tu marches jusqu'au Plateau.`,
          advice: () => "S'enjailler c'est la vie. Mais le maquis ne paie pas ton loyer.",
        },
        {
          id: "sucrerie",
          icon: "🥤",
          label: "Une sucrerie et on rentre",
          quip: "Le juste milieu",
          effects: { argent: -1000, respect: 5, energie: 10 },
          reaction: ["🙂", "👋"],
          result: () =>
            `Tu es ${g("rentré", "rentrée")} à 21h. Sur le groupe WhatsApp, il y a 300 photos de la soirée sans toi.`,
          advice: () => "Savoir partir au bon moment, c'est aussi une forme de sagesse.",
        },
        {
          id: "dodo",
          icon: "🏠",
          label: "Rentrer direct dormir",
          quip: "Le lit ne demande pas de cotisation",
          effects: { energie: 20, respect: -10 },
          reaction: ["😴", "😒"],
          result: () =>
            `Les collègues ont dit que tu es ${g("devenu sérieux", "devenue sérieuse")} comme un pasteur. Mais demain, c'est toi qui seras en forme.`,
          advice: () => "Le repos, c'est un investissement. Même si les collègues ne comprennent pas.",
        },
      ],
    },
    {
      id: "retour",
      set: "yop",
      place: "📍 Yopougon · Retour à la maison",
      icon: "🌃",
      time: "22:30",
      text: () =>
        `22h30, tu descends au carrefour de Yop. La maison est à 45 minutes à pied. Le voisin a déjà mis le zouglou à fond pour toute la rue, et sur les 3 lampadaires du quartier… 2 marchent. C'est déjà bien.`,
      choices: [
        {
          id: "marcher",
          icon: "🚶",
          label: "Rentrer à pied",
          quip: "C'est pas loin… 45 minutes",
          cinematic: "walkHome",
          time: "23:15",
          effects: { energie: -20, sante: 5 },
          result: () =>
            "Tu as marché sous les 2 lampadaires qui marchent, salué tout le quartier et esquivé 4 nids de poule. Ton corps dit merci pour le sport.",
          advice: () => "La nuit à Yop, tout le monde se connaît. Même les chiens te disent bonsoir.",
        },
        {
          id: "woro-nuit",
          icon: "🚖",
          label: "Prendre un woro-woro de nuit",
          quip: "Tarif de nuit : le prix du jour × 2",
          cinematic: "woro",
          bubble: `C'est tarif de nuit${NBSP}! 600${NBSP}!`,
          time: "22:45",
          effects: { argent: -600, energie: -5 },
          result: () =>
            `Le chauffeur a dit «${NBSP}c'est tarif de nuit${NBSP}». Tu as demandé à quelle heure commence la nuit. Il a répondu${NBSP}: «${NBSP}Quand je veux.${NBSP}»`,
          advice: () => "La nuit, les prix montent. Le sommeil, lui, est gratuit : rentre plus tôt la prochaine fois.",
        },
        {
          id: "grin",
          icon: "🍵",
          label: "Rester causer avec les gars du quartier",
          quip: "Le grin, c'est sacré",
          time: "01:00",
          effects: { energie: -15, respect: 10 },
          reaction: ["🍵", ""],
          result: () =>
            "Vous avez refait le match des Éléphants, parlé de tout le quartier et bu 4 petits verres de thé bien sucré. Il est 1h du matin.",
          advice: () => "Le grin, c'est bien. Mais demain, ton réveil va encore sonner 3 fois.",
        },
      ],
    },
  ],

  end: {
    place: "🌙 Fin de la journée",
    next: "cette fois, c'est toi l'apprenti du gbaka 🚐",
    text: () => {
      const parts = [`${player.name}, ta première journée à Babi est finie.`];

      if (state.argent >= 7000) parts.push(`Tu as encore du wari${NBSP}: tu es ${g("un vrai économe", "une vraie économe")}.`);
      else if (state.argent >= 3000) parts.push("Le wari a pris un coup, mais ça va aller.");
      else parts.push("Ton porte-monnaie est plus vide que le frigo d'un étudiant le 28 du mois.");

      if (state.respect >= 75) parts.push(`Et tout le Plateau parle de toi${NBSP}!`);
      else if (state.respect <= 30) parts.push("Par contre, même le gardien ne te salue plus.");

      if (state.energie <= 30) parts.push("Ce soir, tu vas dormir comme un bébé.");

      parts.push("Demain, Babi t'attend encore.");
      return parts.join(" ");
    },
  },
};
