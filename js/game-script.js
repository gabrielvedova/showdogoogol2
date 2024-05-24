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

function startTimer() {

  let time = 61; // tempo em segundos
  const timerElement = document.querySelector("#timer"); // substitua "#timer" pelo seletor do seu elemento de tempo

  timer = setInterval(() => {
    time--;
    let minutes = Math.floor(time / 60).toString().padStart(2, '0');
    let seconds = (time % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (time <= 0) {
      clearInterval(timer);
      // Coloque aqui o que você quer que aconteça quando o tempo acabar
      finish();
    }
  }, 1000);
};

startTimer();
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

/*btnRestart.onclick = () => {
  content.style.display = "flex";
  content2.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  usedEasyQuestions = [];
  usedMediumQuestions = [];
  usedHardQuestions = [];
  btnHelp1.disabled = false;
  btnHelp1.style.background = "#261201";

  btnHelp2.disabled = false;
  btnHelp2.style.background = "#261201";

  btnHelp3.disabled = false;
  btnHelp3.style.background = "#261201";

  btnHelp4.disabled = false;
  btnHelp4.style.background = "#261201";
  loadQuestion();
};*/

function checkAnswer(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
    nextQuestion()
  } else {
    finish()
  }
}

export function nextQuestion() {
  if (currentIndex < 14) {
    currentIndex++;
    loadQuestion();
    // Reinicia o temporizador
    clearInterval(timer); // para o temporizador atual
    startTimer(); // inicia um novo temporizador
  } else {
    finish();
  }
}

let Score;
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
  if (currentIndex < 5) {
    let randomIndex = randomizeEasyQuestions();
    item = easyQuestions[randomIndex];
    usedEasyQuestions.push(randomIndex);
  } else if (currentIndex < 10) {
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
    const div = document.createElement("li");

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

// GAME OVER

loadQuestion();