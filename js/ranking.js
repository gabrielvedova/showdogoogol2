import { Score } from './game-script.js';

const nomeUsuario = document.getElementById('NomeUsuario');
const btnRegistrar = document.getElementById('btnRegistrar');

btnRegistrar.addEventListener('click', () => {
  const nome = nomeUsuario.value;
  window.location.href = 'Placar.html';
  nomeUsuario.value = '';
});
