import { Score, stopTime } from './game-script.js';

const nomeUsuario = document.getElementById('NomeUsuario');
const btnRegistrar = document.getElementById('btnRegistrar');
const contentFinish = document.querySelector('.finish');
const mainRanking = document.querySelector('.mainRanking');

btnRegistrar.addEventListener('click', () => {
  stopTime();

  contentFinish.style.display = 'none';
  mainRanking.style.display = 'flex';
  console.log('Que porra é essa?');
  loadUser();
});

function loadUser() {
  // ranking.js

  fetch('../rankingDados.json')
    .then(response => response.json())
    .then(data => {
      const rankingTable = document.querySelector('.ranking');

      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
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
}