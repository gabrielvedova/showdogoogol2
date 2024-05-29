import { Score, stopTime } from './game-script.js';

const nomeUsuario = document.getElementById('NomeUsuario');
const selectionClass = document.getElementById('SelectionClass');
const btnRegistrar = document.getElementById('btnRegistrar');
const contentFinish = document.querySelector('.finish');
const mainRanking = document.querySelector('.mainRanking');

btnRegistrar.addEventListener('click', () => {
  const userData = {
    name: nomeUsuario.value,
    score: Score,
    gradeAndClass: selectionClass.value,
  };

  contentFinish.style.display = 'none';
  mainRanking.style.display = 'flex';
  console.log(userData);
  addUser(userData);
  loadUser();

  /*  addUser(userData)
      .then(data => {
        const newId = data.data.id;
        for (let i = 0; i < 5; i++) {
          if (newId != i) {
            const rankingTable = document.querySelector('.ranking');
            const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td>
              <div class="position">${newId}</div>
            </td>
            <td>
              <div class="name">${data.data.name}</div>
            </td>
            <td>
              <div class="score">${data.data.score}</div>
            </td>
            <td>
              <div class="gradeAndClass">${data.data.gradeAndClass}</div>
            </td>
          `;
          rankingTable.appendChild(row);
          loadUser();
          } else {
            loadUser();
          }
        }
      })
      .catch(error => console.error('Houve um erro:', error));*/
  nomeUsuario.value = '';
  selectionClass.value = '';
});

function addUser(user) {
  return fetch('https://api-sdg2.onrender.com/ranking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Usuário adicionado com sucesso:', data);
      return data;
    })
    .catch(error => {
      console.log('Houve um erro:', error);
      throw error;
    });
}

export function loadUser() {
  fetch('https://api-sdg2.onrender.com/ranking?rangeEnd=3')
    .then(response => response.json())
    .then(data => {
      const users = data.data;
      const rankingTable = document.querySelector('.ranking');
      rankingTable.innerHTML = ''; // Clear previous content
      users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="position">${index + 1}</div>
          </td>
          <td>
            <div class="name">${user.name}</div>
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
      stopTime();
    })
    .catch(error => console.error('Error fetching ranking data:', error));
}
