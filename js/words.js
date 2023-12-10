const btn = document.getElementById("btn_parse");
const field = document.querySelector('.word_field');
var menu = document.querySelector('.words_menu');
const blockCounter = document.querySelector('.countClick');
const res = new Map();
let arrKeys = []; //использованные ключи
let counter = [];
let coordX;
let coordY;

btn.addEventListener("click", takeApart);

function takeApart(){
    const arr = (document.getElementById('str').value).split('-');
    const w_arr=[];
    const n_arr=[];
    arr.forEach(el => {
        if(!isNumber(el) || el == ''){
            w_arr.push(el)
        }
        else{
            n_arr.push(el)
        }
    });

    w_arr.sort();
    n_arr.sort((a,b)=>a-b);

    let prop = 'a';
    for (let i=0; i<w_arr.length; i++){
        res.set(`${prop}${i+1}`, w_arr[i]);
    }
    prop='n';
    for (let i=0; i<n_arr.length; i++){
        res.set(`${prop}${i+1}`, n_arr[i]);
    }

    menu.innerHTML='';
    for (let el of res){
        const text = `<li class="word" draggable="true" counter="1">${el}</li>`;
        menu.insertAdjacentHTML('beforeend',text);
    }
    
    const word = document.querySelectorAll('.word');
    word.forEach(w => w.addEventListener('dragstart', dragStart));
    word.forEach(w => w.addEventListener('dragend', dragEnd));
    for (let w of word){
        w.addEventListener('click', makeClick());
        w.addEventListener('click', showCount);
    }

    field.addEventListener('dragover', dragOver);
    field.addEventListener('dragleave', dragLeave);
    field.addEventListener('dragenter', dragEnter);
    field.addEventListener('drop', dragDrop);

    menu.addEventListener('dragover',dragOver);
    menu.addEventListener('drop', dragDrop);
};

function dragStart(e){
    coordX = e.offsetX;
    coordY = e.offsetY;
    setTimeout(()=>{
        this.classList.add('hidden');
        this.classList.add('selected');
    }, 0)
};

function dragEnd(){
    setTimeout(()=>{
        this.classList.remove('hidden');
        this.classList.remove('selected');
    }, 0)
};

function dragOver(e){
    e.preventDefault();
};

function dragEnter(){
    this.classList.add('hovered');
};

function dragLeave(){
    this.classList.remove('hovered');
};

function dragDrop(e){
    const w = document.querySelector('.selected');
    const display_list = document.querySelector('.display_list');
    if(document.querySelector('.display_words').classList.contains('hidden')){
        document.querySelector('.display_words').classList.remove('hidden');
    }
    w.style.position = 'absolute';
    w.style.top = (e.pageY-coordY) +'px';
    w.style.left = (e.pageX-coordX) +'px';

    this.append(w);

    const key = (w.innerHTML).split(',')[0];
    if(this == field && !arrKeys.includes(key)){
        const text = `<li class="some_word ${key}">${(w.innerHTML).split(',')[1]}</li>`;
        display_list.insertAdjacentHTML('beforeend',text);
        arrKeys.push(key);
    }
    else if (this == menu && arrKeys.includes(key)){
        document.querySelector(`.${key}`).remove();
        const index = arrKeys.indexOf(key);
        arrKeys.splice(index,1);
    }
    
};

function makeClick() {
    var clicks = 0
    return e => e.target.setAttribute('counter', `${++clicks}`);
}

function showCount(){
    if(blockCounter.classList.contains('hidden')){
        blockCounter.classList.remove('hidden');
    }
    const id = `${(this.innerHTML).split(',')[0]}`;
    const span = document.getElementById(id);
    if(span){
        span.innerHTML = `${this.getAttribute('counter')} раз на элемент "${this.innerHTML}"`;
    }
    else{
        blockCounter.innerHTML += `<span id="${id}">${this.getAttribute('counter')} раз на элемент "${this.innerHTML}"</span><br>`;
    }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }