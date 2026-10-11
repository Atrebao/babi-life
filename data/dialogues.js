const NBSP = "\u00a0";

const INTRO = [
  `Ehhh${NBSP}! On dit quoi${NBSP}? Bienvenue à Babi, la ville où même le soleil arrive en retard à cause des embouteillages.`,
  `Moi c'est Vieux Père Ali. 40 ans à Yop. Je connais tous les maquis, tous les gbakas… et même les nids de poule par leur prénom.`,
  `Avant de te lâcher dans Babi, faut qu'on fasse ta carte d'identité. Et c'est gratuit hein, même pas besoin de photo${NBSP}!`,
];

const tutorial = () => [
  {
    target: null,
    text: `${player.name}${NBSP}! Hum, ça c'est un nom de quelqu'un qui va réussir. Bon, écoute bien, je vais te montrer comment Babi fonctionne.`,
  },
  {
    target: '[data-stat="argent"]',
    text: `Ça, c'est ton wari${NBSP}: 10${NBSP}000 FCFA. À Babi, l'argent c'est comme le courant${NBSP}: le délestage peut tomber à tout moment.`,
  },
  {
    target: '[data-stat="energie"]',
    text: `Ton énergie ⚡. Quand ça finit, même pour crier «${NBSP}Apprenti, à côté${NBSP}!${NBSP}» dans le gbaka devient difficile.`,
  },
  {
    target: '[data-stat="sante"]',
    text: `Ta santé ❤️. Le garba c'est bon, mais garba matin, midi et soir… ton corps va porter plainte.`,
  },
  {
    target: '[data-stat="respect"]',
    text: `Ton respect ⭐. À Babi, si on te prend pour un petit, c'est fini${NBSP}: même les enfants du quartier vont t'envoyer acheter du pain.`,
  },
  {
    target: null,
    text: `Chaque choix fait bouger tes jauges. Si une jauge tombe à zéro… ça va chauffer. Allez, on est ensemble${NBSP}! Ta journée commence.`,
  },
];
