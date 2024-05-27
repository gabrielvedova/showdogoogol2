import { loadUser } from './ranking.js';
import { stopTime } from './game-script.js';

window.onload = function () {

    // Verifica se o botão foi clicado
    if (localStorage.getItem('btnClicked') === 'true') {
      const contents = document.getElementsByClassName('content');
      const contents2 = document.getElementsByClassName('content2');
      const finishes = document.getElementsByClassName('finish');
      const mainRankings = document.getElementsByClassName('mainRanking');

      // Altera o estilo de todos os elementos em cada coleção
      [...contents, ...contents2, ...finishes].forEach(el => {
        el.style.display = 'none';
      });
      [...mainRankings].forEach(el => {
        el.style.display = 'flex';
      });

      // Limpa a informação do localStorage
      localStorage.removeItem('btnClicked');

      // Carrega os usuários
      loadUser();
      stopTime();
    }
  };