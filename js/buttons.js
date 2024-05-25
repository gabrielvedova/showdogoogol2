import { nextQuestion, setUsedHelp, getUsedHelp } from './game-script.js';

function usedBoost() {
  setUsedHelp(true);
}

// Half Button

function embaralhar(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // Enquanto ainda houver elementos para embaralhar...
  while (0 !== currentIndex) {

    // Escolha um elemento restante...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E troque-o com o elemento atual.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("helpButton1").addEventListener("click", function() {
    var alternativas = Array.from(document.querySelectorAll(".answers button"));
    var alternativasIncorretas = alternativas.filter(button => button.getAttribute('data-correct') !== "true");

    embaralhar(alternativasIncorretas);

    for (var i = 0; i < alternativasIncorretas.length / 2; i++) {
      alternativasIncorretas[i].style.background = "#d98a2946";
      alternativasIncorretas[i].disabled = true;
    }
    
    // Desabilita o botão após ser clicado
    this.disabled = true;
    this.style.background = "#d98a2946";
    usedBoost();
  });

  // Pular Button

  document.getElementById("helpButton2").addEventListener("click", function() {
    // Desabilita o botão após ser clicado
    this.disabled = true;
    this.style.background = "#d98a2946";
    usedBoost();
  });

  document.getElementById("helpButton3").addEventListener("click", function() {
    // Desabilita o botão após ser clicado
    this.disabled = true;
    this.style.background = "#d98a2946";
    usedBoost();
    nextQuestion();
  });

  document.getElementById("helpButton4").addEventListener("click", function() {
    // Desabilita o botão após ser clicado
    this.disabled = true;
    this.style.background = "#d98a2946";
    usedBoost();
  });
});