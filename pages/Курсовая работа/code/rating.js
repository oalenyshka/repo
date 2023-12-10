const all_users = JSON.parse(localStorage.getItem('rating'));
const field = document.querySelector('.all_rating');

all_users.sort((x, y) => y.score - x.score);

createRating();

function createRating(){
    let place = 1;
    all_users.forEach(elem => {
        let str = `<div class="user_rating"><span class="place">${place} место</span> - ${elem.name} - ${elem.score} баллов</div>`;
        field.innerHTML += str;
        place++;
    });
}