export const mockInitialState = {
  player: {
    name: "",
    assertions: 0,
    score: 0,
    gravatarEmail: "",
  },
  question: {
    indexQuestion: 0,
  },
};

export const playerOne = {
  player: {
    name: "Teste",
    assertions: 4,
    score: 320,
    gravatarEmail: "4675ee57486c6ab9507d64d763ffd4f3",
  },
  question: {
    indexQuestion: 5,
  },
};

export const playerTwo = {
  player: {
    name: "Teste",
    assertions: 2,
    score: 320,
    gravatarEmail: "4675ee57486c6ab9507d64d763ffd4f3",
  },
  question: {
    indexQuestion: 5,
  },
};
export const playersRanking = [
  {
    name: "Teste",
    score: 320,
    picture: "https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f3",
  },
  {
    name: "outroPlayer",
    score: 320,
    picture: "https://www.gravatar.com/avatar/1d640985a4150895564c6728561626f4",
  },
];

export const mockDataToken = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: "5f2a4b191eed3c60be7669cd3475b3e996a4e4f0cf214527f1ca88a8211b14f6",
};

export const mockDataQuestions = {
  response_code: 0,
  results: [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "medium",
      question: "What does the acronym CDN stand for in terms of networking?",
      correct_answer: "Content Delivery Network",
      incorrect_answers: [
        "Content Distribution Network",
        "Computational Data Network",
        "Compressed Data Network",
      ],
    },
    {
      category: "Science & Nature",
      type: "multiple",
      difficulty: "medium",
      question:
        "After which Danish city is the 72th element on the periodic table named?",
      correct_answer: "Copenhagen",
      incorrect_answers: ["Odense", "Herning", "Skagen"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "hard",
      question:
        "In Xenoblade Chronicles X, which class has a sniper rifle as it&#039;s primary weapon?",
      correct_answer: "Partisan Eagle",
      incorrect_answers: ["Blast Fencer", "Winged Viper", "Bastion Warrior"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "hard",
      question:
        "Electronic artists Boys Noize and Skrillex have collaborated and released tracks under what name?",
      correct_answer: "Dog Blood",
      incorrect_answers: ["Jack &Uuml;", "What So Not", "Noisia"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "hard",
      question:
        "Lenovo acquired IBM&#039;s personal computer division, including the ThinkPad line of laptops and tablets, in what year?",
      correct_answer: "2005",
      incorrect_answers: ["1999", "2002", "2008"],
    },
  ],
};
