document.querySelector('#curr_name').innerHTML = sessionStorage.getItem('username');
const btn_levels = document.querySelectorAll('.level');

btn_levels.forEach(btn => {
    btn.addEventListener('click', chooseLevel);
});

document.querySelector('.rating').addEventListener('click', ()=>{
    window.location.href = '../levels/rating.html';
})

function chooseLevel(){
    const isTimer = document.getElementById('useTimer').checked;
    sessionStorage.setItem('timer',isTimer);
    this.classList.add('chosen');
    sessionStorage.setItem('level', this.id);
    sessionStorage['count_wins'] = 0;
    window.location.href = '../levels/level1.html';
}

window.onload = function(){
    let open_levels = sessionStorage['open_levels'];
    for(let i = 0; i<open_levels; i++){
        if(document.getElementById(i+1).classList.contains('disabled')){
            document.getElementById(i+1).classList.remove('disabled')
        }
    }
};