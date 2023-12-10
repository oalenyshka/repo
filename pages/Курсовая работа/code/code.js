const btn_start = document.querySelector('.btn_start');
const auth = document.querySelector('.authorization');
const rules = document.querySelector('.rules');
const btn_next = document.querySelector('.btn_next');
let username;


btn_start.addEventListener('click', startGame);

btn_next.addEventListener('click', ()=>{
    rules.classList.add('hidden');
    sessionStorage.setItem('username', username);
    window.location = 'levels/menu_levels.html';
})

function startGame(){
    sessionStorage.clear();
    sessionStorage.setItem('open_levels', 1);
    sessionStorage.setItem('userScore', 0);
    username = document.getElementById('username').value;
    if (username == ''){
        alert('Чтобы начать игру, введите ваше имя!');
    }
    else{
        auth.classList.add('hidden');
        rules.classList.remove('hidden');
        let my_user = {name:`${username}`, score: 0};
        if(localStorage.getItem('rating')==undefined){
            localStorage.setItem('rating', JSON.stringify([my_user]));
        }
        else{
            let x = JSON.parse(localStorage.getItem('rating'));
            x.push(my_user);
            localStorage.setItem('rating', JSON.stringify(x));
        }
    }
}

