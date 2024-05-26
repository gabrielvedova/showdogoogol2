import { Score, stopTime } from './game-script.js';

const nomeUsuario = document.getElementById('NomeUsuario');
const btnRegistrar = document.getElementById('btnRegistrar');
const contentFinish = document.querySelector('.finish');
const mainRanking = document.querySelector('.mainRanking');

btnRegistrar.addEventListener('click', () => {
  stopTime();
  contentFinish.style.display = 'none';
  mainRanking.style.display = 'flex';
  addUser();
  loadUser();
});


function loadUser() {
  fetch('../rankingDados.json')
    .then(response => {
      return response.json();
    })
    .then(dados => {
      const ranking = document.querySelector('.ranking');

      let dadosOrdenados = [...dados].sort((a, b) => b.pontos - a.pontos);

      // Pega os 5 primeiros dados
      let dadosSelecionados = [...dadosOrdenados.slice(0, 5)];

      let position = 0;
      dadosSelecionados.map(dado => {
        position = dadosOrdenados.indexOf(dado) + 1;
        const username = document.createElement('tr');

        username.innerHTML = `
        <td>
            <div class="position">${position}</div>
        </td>
        <td>
            <div class="name">${dado.name}</div>
        </td>
        <td>
            <div class="points">${dado.pontos}</div>
        </td>
        `

        ranking.appendChild(username);
      })
    })
    .catch(e => {
      console.log(e);
    })
};

function addUser() {
  fetch('../rankingDados.json')
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso:', data);
      // Aqui você pode adicionar o novo dado ao array e fazer o que precisar com ele
      const novoDado = { name: nomeUsuario.value, pontos: Score };
      data.push(novoDado);
      nomeUsuario.value = '';
      console.log(data); // Agora data inclui o novoDado
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}
