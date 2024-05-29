const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector("#textFinish");
const content = document.querySelector(".content");
const content2 = document.querySelector(".content2");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector("#btn1");
const msgFinish = document.querySelector("#msgFinish");

let timer;
let time;

import { gameStatus } from "./buttons.js";

function startTimer() {

  time = 120; // tempo em segundos
  const timerElement = document.querySelector("#timer"); // substitua "#timer" pelo seletor do seu elemento de tempo

  timer = setInterval(() => {
    time--;
    let minutes = Math.floor(time / 60).toString().padStart(2, '0');
    let seconds = (time % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (time <= 0) {
      stopTime();
      // Coloque aqui o que você quer que aconteça quando o tempo acabar
      finish();
    }
  }, 1000);
};

function stopTime() {
  clearInterval(timer);
}

startTimer();


let questionsArray = [];

let currentIndex = 0;
let questionsCorrect = 0;

let usedEasyQuestions = [];
let usedMediumQuestions = [];
let usedHardQuestions = [];
let usedGoogolQuestions = [];

const easyQuestions = [];
const mediumQuestions = [];
const hardQuestions = [];
const googolQuestions = [];

fetch("https://api-sdg2.onrender.com/questions")
  .then(response => response.json())
  .then(responseData => {
    const data = responseData.data.questions;

    questionsArray = data;

    questionsArray.forEach((item) => {
      switch (item.level) {
        case 1:
          easyQuestions.push(item);
          break;
        case 2:
          mediumQuestions.push(item);
          break;
        case 3:
          hardQuestions.push(item);
          break;
        case 4:
          googolQuestions.push(item);
          break;
      };
    })

    console.log(easyQuestions)
    console.log(mediumQuestions)
    console.log(hardQuestions)
    console.log(googolQuestions)

    console.log(easyQuestions)
    console.log(mediumQuestions)
    console.log(hardQuestions)
    console.log(googolQuestions)

    // Agora que temos as perguntas, podemos carregar a primeira
    loadQuestion();
  })
  .catch(error => console.error('Erro ao buscar perguntas:', error));



function checkAnswer(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
    nextQuestion();
  } else {
    finish()
  }
}

let Score = 0;
let pontuacao = 0;

function nextQuestion() {

  if (currentIndex < 14) {

    if (questionsCorrect <= 5) {
      pontuacao += questionsCorrect * 10000;

    } else if (questionsCorrect <= 10) {
      pontuacao += questionsCorrect * 30000;

    } else {
      pontuacao += questionsCorrect * 50000;

    }

    if (gameStatus.usedBoost) {
      pontuacao = Math.floor(pontuacao / 2);
    }

    Score += Math.floor(pontuacao * (120 - time) / (120 - 1));



    currentIndex++;
    loadQuestion();

    // Reinicia o temporizador
    clearInterval(timer); // para o temporizador atual
    startTimer(); // inicia um novo temporizador
  } else {
    finish();
  };
  
  gameStatus.usedHelp = false;

}

function finish() {
  if (questionsCorrect >= 14) {
    msgFinish.innerText = "GAME WIN!";
  } else {
    msgFinish.innerText = "GAME OVER!";
  }

  textFinish.innerHTML = `Score: ${Score}`;
  content.style.display = "none";
  content2.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `Pergunta ${currentIndex + 1}`;

  let item;
  if (currentIndex < 4) { // 4
    let randomIndex = randomizeEasyQuestions();
    while (usedEasyQuestions.includes(randomIndex)) {
      randomIndex = randomizeEasyQuestions();
    }
    item = easyQuestions[randomIndex];
    usedEasyQuestions.push(randomIndex);
  } else if (currentIndex < 9) { // 5
    let randomIndex = randomizeMediumQuestions();
    while (usedMediumQuestions.includes(randomIndex)) {
      randomIndex = randomizeMediumQuestions();
    }
    item = mediumQuestions[randomIndex];
    usedMediumQuestions.push(randomIndex);
  } else if (currentIndex < 14) { // 5
    let randomIndex = randomizeHardQuestions();
    while (usedHardQuestions.includes(randomIndex)) {
      randomIndex = randomizeHardQuestions();
    }
    item = hardQuestions[randomIndex];
    usedHardQuestions.push(randomIndex);
  } else { // 1
    let randomIndex = randomizeGoogolQuestions();
    while (usedGoogolQuestions.includes(randomIndex)) {
      randomIndex = randomizeGoogolQuestions();
    }
    item = googolQuestions[randomIndex];
    usedGoogolQuestions.push(randomIndex);
  }

  answers.innerHTML = "";
  question.innerHTML = item.title;

  item.answers.forEach((answer) => {
    const div = document.createElement("li");

    div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
          ${answer.content}
        </button>
        `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", checkAnswer);
  });

  // Reinicia o temporizador
  clearInterval(timer); // para o temporizador atual
  startTimer(); // inicia um novo temporizador
}

function randomize(interval) {
  let randomIndex = Math.floor(Math.random() * interval)
  return randomIndex;
}

function randomizeEasyQuestions() {
  while (true) {
    let randomIndex = randomize(easyQuestions.length);
    if (usedEasyQuestions.indexOf(randomIndex) == -1) {
      return randomIndex;
    }
  }
}

function randomizeMediumQuestions() {
  while (true) {
    let randomIndex = randomize(mediumQuestions.length);
    if (usedMediumQuestions.indexOf(randomIndex) == -1) {
      return randomIndex;
    }
  }
}

function randomizeHardQuestions() {
  while (true) {
    let randomIndex = randomize(hardQuestions.length);
    if (usedHardQuestions.indexOf(randomIndex) == -1) {
      return randomIndex;
    }
  }
}

function randomizeGoogolQuestions() {
  while (true) {
    let randomIndex = randomize(googolQuestions.length);
    if (usedGoogolQuestions.indexOf(randomIndex) == -1) {
      return randomIndex;
    }
  }
}

export { Score, stopTime, nextQuestion };