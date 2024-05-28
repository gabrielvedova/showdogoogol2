import { Score, stopTime } from './game-script.js';

const nomeUsuario = document.getElementById('NomeUsuario');
const selectionClass = document.getElementById('SelectionClass');
const btnRegistrar = document.getElementById('btnRegistrar');
const contentFinish = document.querySelector('.finish');
const mainRanking = document.querySelector('.mainRanking');

const userData = {
  name: nomeUsuario.value,
  score: Score,
  gradeAndClass: selectionClass.value
};

btnRegistrar.addEventListener('click', () => {

  contentFinish.style.display = 'none';
  mainRanking.style.display = 'flex';
  saveUser().then(data => console.log(data))
  loadUser();
});

export function loadUser() {
  fetch('https://api-sdg2.onrender.com/ranking?rangeEnd=5')
    .then(response => response.json())
    .then(data => {


      const users = data.data;
      const rankingTable = document.querySelector('.ranking');
      users.forEach((user, index) => {
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
  return fetch('https://api-sdg2.onrender.com/ranking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => {
      console.log('User data saved successfully:', response)
      return response.json();
    })
    .catch(error => console.error('Error saving user data:', error));
}