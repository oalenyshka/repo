const game_field = document.querySelector('.game_field');
const btn_add_bottle = document.querySelector('.add_bottle');
const dlgNextLevel = document.getElementById('dlgNextLevel');
let numBottles = 0;
let fullBottles = 0;
let targetFullBottles;
let colors = ['rgb(216, 253, 140)', 'rgb(209, 142, 246)', 'rgb(250, 138, 201)', 'rgb(192, 255, 232)'];
let using_colors = [];
const maxHeight = 300;
let numBlock = 5;
let controlColor = {};
colors.forEach(c => {
    controlColor[c] = 0;
});

let isDragging = false;
let draggedBottle = null;

document.querySelector('.arrow').addEventListener('click', ()=>{
    window.location.href = '../levels/menu_levels.html';
})


document.addEventListener("DOMContentLoaded", function() {
    const lev = sessionStorage.getItem('level');
    if(lev == 1){
        numBottles=3;
        targetFullBottles = 2;
        using_colors = colors.slice(0,2);
    }
    else if (lev == 2){
        numBottles=5;
        targetFullBottles = 3;
        using_colors = colors.slice(0,3);
    }
    else{
        numBottles=7;
        targetFullBottles = 4;
        using_colors = colors.slice(0,4);
    }
    fillField();
});

btn_add_bottle.addEventListener('click', addBottle);

function fillField(){
    if(document.querySelectorAll('.bottle')){
        document.querySelectorAll('.bottle').forEach((b)=>{
            b.remove();
        })
    }
    for(i = 0; i<numBottles; i++){
        const bottle = createBottle();
        fillBottle(bottle);
        game_field.append(bottle);
    }

    colors.forEach(c => {
        controlColor[c] = 0;
    });
    document.querySelector('#userScore').innerHTML = sessionStorage.getItem('userScore');
    const bottles = document.querySelectorAll('.bottle');
    bottles.forEach(b => b.addEventListener('dragstart', dragStart));
    bottles.forEach(b => b.addEventListener('dragend', dragEnd));
    bottles.forEach(b => b.addEventListener('dragover', dragOver));
}

function createBottle() {
    const currentBottles = document.querySelectorAll('.bottle').length || 0;
    const bottle = document.createElement('div');
    bottle.classList.add('bottle');
    bottle.setAttribute('draggable', 'true');
    bottle.id = currentBottles+1;
    return bottle;
}

function fillBottle(glassElement) {
    const blockHeight = Math.floor(maxHeight / numBlock);
    
    for (let i = 0; i < numBlock; i++) {
        const liquidBlock = document.createElement("div");
        let currColor;
        liquidBlock.className = `liquid-block ${i}`;
        liquidBlock.style.height = `${blockHeight}px`;
        liquidBlock.style.backgroundColor = using_colors.sample();
        currColor = liquidBlock.style.backgroundColor;
        controlColor[currColor] +=1;
        if(controlColor[currColor] == numBlock){
            using_colors= using_colors.filter((n) => {return n != `${currColor}`});
        }

        if(i == numBlock-1){
            liquidBlock.style.borderRadius = '0 0 23px 23px';
        }

        glassElement.appendChild(liquidBlock);
    }
    notOneColor(glassElement);
}

function notOneColor(bottle){
    const children = bottle.children;
    let count = 0;
    for(let i = 1; i<children.length-1; i++){
        if(children[i-1].style.backgroundColor == children[i].style.backgroundColor && children[i-1].style.backgroundColor != ''){
            count++;
        }
    }

    if(count == children.length-2){
        const index =Math.floor(Math.random() * numBlock);
        const lastColor = children[index].style.backgroundColor;
        controlColor[lastColor] -=1;
        children[index].style.backgroundColor = using_colors.sample();
        using_colors.push(lastColor);
        const newColor = children[index].style.backgroundColor;
        controlColor[newColor] +=1;
        if(controlColor[newColor] == numBlock){
            using_colors= using_colors.filter((n) => {return n != `${newColor}`});
        }

    }
};

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

function dragStart(){
    isDragging = true;
    draggedBottle = this;
    setTimeout(()=>{
        draggedBottle.classList.add('noshow');
    }, 0);
}

function dragOver(e){
    e.preventDefault();
    this.style.cursor = 'pointer';
}


function dragEnd(e){
    draggedBottle.classList.remove('noshow');
    if (isDragging) {
        isDragging = false;

        const sourceGlass = draggedBottle;
        const targetGlass = (document.elementFromPoint(e.clientX, e.clientY)).parentElement;

        if (targetGlass && targetGlass.classList.contains("bottle")) {
            const sourceLiquidBlock = sourceGlass.querySelectorAll(".liquid-block");
            const sourceLiquid = getSourceLiquid(sourceLiquidBlock);
            const targetLiquidBlock = targetGlass.querySelectorAll(".liquid-block");
            let targetLiquid = getTargetLiquid(targetLiquidBlock);

            if (sourceLiquid && targetLiquid && sourceLiquid !== targetLiquid)
            {
                if(targetLiquid.style.backgroundColor ==''){
                    targetLiquid.style.backgroundColor = sourceLiquid.style.backgroundColor;
                    sourceLiquid.style.backgroundColor = '';
                }
                else if(sourceLiquid.style.backgroundColor == targetLiquid.style.backgroundColor){
                    targetLiquid = targetLiquid.previousElementSibling;
                    if(targetLiquid){
                        targetLiquid.style.backgroundColor = sourceLiquid.style.backgroundColor;
                        sourceLiquid.style.backgroundColor = '';
                    }
                }
                fullBottle(targetGlass);
            }
        }
    }
}

function getSourceLiquid(sourceLiquidBlock){
    for(i = 0; i<sourceLiquidBlock.length; i++){
        if(sourceLiquidBlock[i].style.backgroundColor != ''){
            const sourceLiquid = sourceLiquidBlock[i];
            return sourceLiquid;
        }
    };
}

function getTargetLiquid(targetLiquidBlock){
    let targetLiquid;
    for(i = 0; i<targetLiquidBlock.length; i++){
        if(targetLiquidBlock[i].style.backgroundColor != ''){
            targetLiquid = targetLiquidBlock[i];
            break
        }
        targetLiquid = targetLiquidBlock[i];
    };
    return targetLiquid;
}

function fullBottle(bottle){
    const blocks = bottle.querySelectorAll('.liquid-block');
    let flag = true;
    for (let i = 0; i<blocks.length-1; i++){
        if(blocks[i].style.backgroundColor!=blocks[i+1].style.backgroundColor){
            flag=false;
            break
        }
    }
    if(flag){
        bottle.classList.add('disabled');
        fullBottles++;
        gameWin();
    }
}

function gameWin(){
    if(fullBottles == targetFullBottles){
        let x = sessionStorage['level'];
        let point = Number(sessionStorage['userScore']);
        point+=numBottles;
        sessionStorage['userScore'] = point;
        let curr_score = JSON.parse(localStorage['rating']);
        console.log(curr_score);
        curr_score[curr_score.length-1].score = point;
        localStorage.setItem('rating', JSON.stringify(curr_score));
        if(sessionStorage['timer']=='true'){
            
            let count_win;
            count_win = sessionStorage['count_wins'];
            count_win++;
            if(count_win == 2 && x != 3){
                // window.dlgNextLevel.showModal();
                // dlgNextLevel.classList.remove('hidden');
                alert('Вы перешли на новый уровень игры!');
                x++;
                sessionStorage['level']=x;
                sessionStorage['open_levels']=x;
                count_win=0;
                sessionStorage['count_wins']=count_win;
            }
            else{
                sessionStorage['count_wins']=count_win;
                setTimeout(() => {
                    alert('Вы выиграли! Количество побед: '+count_win);
                }, 100);
            }
        }
        location.reload();
    }
}

function addBottle(){
    if(document.querySelectorAll('.bottle').length < 8)
    {
        const bottle = createBottle();
        fillBottle(bottle);
        game_field.append(bottle);
        bottle.addEventListener('dragstart', dragStart);
        bottle.addEventListener('dragend', dragEnd);
        bottle.addEventListener('dragover', dragOver);
    }
    else{
        btn_add_bottle.classList.add('disabled');
    }
}