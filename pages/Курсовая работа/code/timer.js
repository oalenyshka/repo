const timerElement = document.getElementById('userTime');
const divTimer =document.getElementById('timer');
const loss = document.getElementById('dlgLoss');
const btn_loss = document.getElementById('btn_loss');
const btn_back_menu = document.getElementById('btn_back_menu');

btn_loss.addEventListener('click', function(){
  loss.classList.add('hidden');
  window.dlgLoss.close();
  location.reload();
})

btn_back_menu.addEventListener('click', function(){
  loss.classList.add('hidden');
  window.dlgLoss.close();
  window.location.href = '../levels/menu_levels.html';
})

let seconds=100000000;
whichLevel();
function whichLevel(){
  let x = sessionStorage['level'];
  if(x == 1){
    seconds = 15;
  }
  else if(x==2){
    seconds=30;
  }
  else{
    seconds=45;
  }
}

let timer;
useTimer();
function useTimer(){
  if(sessionStorage['timer'] == 'true'){
    if(divTimer.classList.contains('hidden')){
      divTimer.classList.remove('hidden');
    }
    updateTimer();
  }
  else{
    divTimer.classList.add('hidden');
  }
}

function updateTimer() {
    timerElement.innerText = `${seconds}`;
    seconds--;
    if (seconds<0){
        clearTimeout(timer); // таймер остановится на нуле
        setTimeout(()=>{
          
          sessionStorage['count_wins'] = 0;
          sessionStorage['userScore'] = 0;
          window.dlgLoss.showModal();
          loss.classList.remove('hidden');
        }, 100);
      }
    else {
      timer = setTimeout(updateTimer, 1000);
    }
}