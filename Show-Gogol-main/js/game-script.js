const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector("#textFinish");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector("#btn1");

import questions from "../questions.js";

const questionsArray = questions

let currentIndex = 0;
let questionsCorrect = 0;

let usedEasyQuestions = [];
let usedMediumQuestions = [];
let usedHardQuestions = [];

const easyQuestions = [];
const mediumQuestions = [];
const hardQuestions = [];

questionsArray.forEach((item) => {
  switch (item.level) {
    case "easy":
      easyQuestions.push(item);
      break;
    case "medium":
      mediumQuestions.push(item);
      break;
    case "hard":
      hardQuestions.push(item);
      break;
  };
})

console.log(easyQuestions)
console.log(mediumQuestions)
console.log(hardQuestions)

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  usedEasyQuestions = [];
  usedMediumQuestions = [];
  usedHardQuestions = [];
  loadQuestion();
};

function checkAnswer(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
    nextQuestion()
  } else {
    finish()
  }
}

function nextQuestion() {
  if (currentIndex < 14) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${15}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${15}`;
  let item;
  if (currentIndex < 5){
    let randomIndex = randomizeEasyQuestions();
    item = easyQuestions[randomIndex];
    usedEasyQuestions.push(randomIndex);
  } else if (currentIndex < 10){
    let randomIndex = randomizeMediumQuestions();
    item = mediumQuestions[randomIndex];
    usedMediumQuestions.push(randomIndex);
  } else {
    let randomIndex = randomizeHardQuestions();
    item = hardQuestions[randomIndex];
    usedHardQuestions.push(randomIndex);
  }
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", checkAnswer);
  });
}

function randomize(interval) {
  let randomIndex = Math.floor(Math.random()*interval)
  return randomIndex;
}

function randomizeEasyQuestions() {
  while (true){
    let randomIndex = randomize(easyQuestions.length);
    if (usedEasyQuestions.indexOf(randomIndex) == -1){
      return randomIndex;
    }
  }
}

function randomizeMediumQuestions() {
  while (true){
    let randomIndex = randomize(mediumQuestions.length);
    if (usedMediumQuestions.indexOf(randomIndex) == -1){
      return randomIndex;
    }
  }
}

function randomizeHardQuestions() {
  while (true){
    let randomIndex = randomize(hardQuestions.length);
    if (usedHardQuestions.indexOf(randomIndex) == -1){
      return randomIndex;
    }
  }
}

loadQuestion();