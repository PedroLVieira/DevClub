const choices = ["pedra", "papel", "tesoura"];

const choiceEmoji = {
  pedra: "🪨",
  papel: "📄",
  tesoura: "✂️"
};

let userScore = 0;
let siteScore = 0;

const userScoreElement = document.getElementById("user-score");
const siteScoreElement = document.getElementById("site-score");
const resultElement = document.getElementById("result");
const roundDetailElement = document.getElementById("round-detail");

function getSiteChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function checkWinner(userChoice, siteChoice) {
  if (userChoice === siteChoice) {
    return "empate";
  }

  const userWon =
    (userChoice === "pedra" && siteChoice === "tesoura") ||
    (userChoice === "papel" && siteChoice === "pedra") ||
    (userChoice === "tesoura" && siteChoice === "papel");

  return userWon ? "usuario" : "site";
}

function play(userChoice) {
  const siteChoice = getSiteChoice();
  const winner = checkWinner(userChoice, siteChoice);

  roundDetailElement.textContent = `Você: ${choiceEmoji[userChoice]} | Site: ${choiceEmoji[siteChoice]}`;

  if (winner === "empate") {
    resultElement.textContent = "Empatou! 🤝";
    return;
  }

  if (winner === "usuario") {
    userScore += 1;
    userScoreElement.textContent = userScore;
    resultElement.textContent = "Você venceu esta rodada! 🎉";
    return;
  }

  siteScore += 1;
  siteScoreElement.textContent = siteScore;
  resultElement.textContent = "O site venceu esta rodada! 🤖";
}
