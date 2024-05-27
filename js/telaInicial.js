const btnRanking = document.getElementById('btnToRanking');
const content = document.getElementsByClassName('content');
const content2 = document.getElementsByClassName('content2');
const finish = document.getElementsByClassName('finish');
const mainRanking = document.getElementsByClassName('mainRanking');


btnRanking.addEventListener('click', () => {
    localStorage.setItem('btnClicked', 'true');
});