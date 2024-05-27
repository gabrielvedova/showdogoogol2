const carregando = document.querySelector('.carregando');
const erro = document.querySelector('.erro');

carregando.style.display = 'flex';
erro.style.display = 'none';

let code

fetch('https://api-sdg2.onrender.com').then(response => {
  console.log(response.status)

  if (response.status == 200) {
    window.location.replace('./game.html')
  } else {
    erro.style.display = 'flex';
    carregando.style.display = 'none';
  }
})
