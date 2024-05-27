import { Score, stopTime } from './game-script.js';

const nomeUsuario = document.getElementById('NomeUsuario');
const btnRegistrar = document.getElementById('btnRegistrar');
const contentFinish = document.querySelector('.finish');
const mainRanking = document.querySelector('.mainRanking');

btnRegistrar.addEventListener('click', () => {

  contentFinish.style.display = 'none';
  mainRanking.style.display = 'flex';
  loadUser();
});

export function loadUser() {
  fetch('../rankingDados.json')
    .then(response => response.json())
    .then(data => {
      // Ordena os usuários por pontuação em ordem decrescente
      const sortedData = data.sort((a, b) => b.score - a.score);

      // Pega os primeiros 5 usuários
      const topUsers = sortedData.slice(0, 5);

      const rankingTable = document.querySelector('.ranking');

      topUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="position" >${index + 1}</div>
          </td>
          <td>
            <div class="name" >${user.name}</div>
          </td>
          <td>
            <div class="score">${user.score}</div>
          </td>
          <td>
            <div class="gradeAndClass">${user.gradeAndClass}</div>
          </td>
        `;
        rankingTable.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching ranking data:', error));
    stopTime();
}

export function saveUser() {
  fetch('../rankingDados.json')
    .then(response => response.json())
    .then(data => {})
}