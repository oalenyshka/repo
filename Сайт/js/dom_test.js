const testData = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers:["Пол деревни, за раз",
        "Полдеревни, зараз",
        "Пол-деревни, за раз"],
        correct: "Полдеревни, зараз",
        tooltip: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
    },
    {
        question: "А эти слова как пишутся?",
        answers:["Капуччино и эспрессо",
        "Каппуччино и экспресо",
        "Капучино и эспрессо"],
        correct: "Капучино и эспрессо",
        tooltip: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».",
    },
    {
        question: "Как нужно писать?",
        answers:["Черезчур",
        "Черес-чур",
        "Чересчур"],
        correct: "Чересчур",
        tooltip: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
    },
    {
        question: "Где допущена ошибка1?",
        answers: ["Аккордеон",
        "Белиберда",
        "Эпелепсия"],
        correct: "Эпелепсия",
        tooltip: "Верно! Это слово пишется так: «эпИлепсия».",
    },
    {
        question: "Где допущена ошибка2?",
        answers: ["Аккордеон",
        "Белиберда",
        "Эпелепсия"],
        correct: "Эпелепсия",
        tooltip: "Верно! Это слово пишется так: «эпИлепсия».",
    },
    {
        question: "Где допущена ошибка3?",
        answers: ["Аккордеон",
        "Белиберда",
        "Эпелепсия"],
        correct: "Эпелепсия",
        tooltip: "Верно! Это слово пишется так: «эпИлепсия».",
    },
];

const test = document.querySelector('.test');
const warning = document.querySelector('.warning');
const btnNext = document.querySelector('.btn_test_next');
//Счетчик кол-ва показанных вопросов из теста
let count = 0;
let userScore = 0;
const iconCorrect = "<span>&#10004;</span>";
const iconIncorrect = "<span>&#9940;</span>";
//Массив для хранение правильных(1) и неправильных (0) ответов
let arr_res = [];

//проверка на наличие вопросов в массиве 
if(testData != undefined && testData.length > 0){
    test.classList.remove('hidden');
    //таким образом очищаем массив ответов
    arr_res.length=0;
    //перемешиваем порядок вопросов
    shuffle(testData);
    //перемешиваем порядок вариантов ответа
    for(el of testData){
        shuffle(el.answers);
    }
    showQuestion(count);
}
else{
    //Блок с предупреждением об отсутствии вопросов в тесте
    warning.classList.remove('hidden');
}

btnNext.addEventListener('click', nextQuestion);

//Показ вопроса и вариантов ответа, а также отрисовка шкалы прогресса
function showQuestion(index){
    const title = document.querySelector('.test_title');
    const list = document.querySelector('.test_list');
    const total = document.querySelector('.test_total');
    const progress = document.querySelector('.test_progress_inner');

    title.innerHTML = `${index+1}) ${testData[index].question}`;
    list.innerHTML='';
    for (el of testData[index].answers){
        const text = `<li class="test_answer">${el}</li>`;
        list.insertAdjacentHTML('beforeend',text);
    }

    const ans = list.querySelectorAll('.test_answer');
    //Навешиваем на каждый вариант ответа функцию выбора ответа
    ans.forEach(a => a.setAttribute('onclick', 'answerSelected(this)'));
 
    total.innerHTML = `${index+1} из ${testData.length}`
    progress.style.width = `${Math.round(((index+1)/testData.length)*100)}%`
};

//Обработка выбора ответа
function answerSelected(answer){
    const userAnswer = answer.textContent;
    const correctAnswer = testData[count].correct;
    const list = document.querySelector('.test_list');
    const all_answers = document.querySelectorAll('.test_answer');
    const tooltip = `<span>${testData[count].tooltip}</span>`;

    //Меняем положение ответов из горизонтального в вертикальное
    list.classList.add('selected');

    if(userAnswer == correctAnswer){
        userScore++;
        answer.classList.add('correct');
        arr_res.push(1);
        answer.insertAdjacentHTML('beforeend', iconCorrect);
        answer.insertAdjacentHTML('afterend', tooltip);
    }
    else{
        answer.classList.add('incorrect');
        arr_res.push(0);
        answer.insertAdjacentHTML('beforeend', iconIncorrect);
    }

    //После выбора ответа все ответы становятся недоступными для нажатия
    for(el of all_answers){
        el.classList.add('disabled');
    }
};

//Функция, срабатывающая при клике на кнопку "Следующий"
function nextQuestion(){
    //Выбираем первый вариант ответа, чтобы проверить у него наличие класса "disabled" и убедиться, что какой-то вариант ответа выбран
    const a = document.querySelector('.test_answer');
    const result = document.querySelector('.result');
    const resultText = document.querySelector('.result_text');
    const resultList = document.querySelector('.result_list');

    //Ответ выбран, и вопросы закончились
    if(a.classList.contains('disabled') && (count+1)==testData.length){
        result.classList.remove('hidden');
        test.classList.add('hidden');
        resultText.innerHTML=`Количество правильных ответов: ${userScore} из ${testData.length}`;
        resultList.innerHTML='';
        //Выводим все вопросы из теста, соответствующие им значки (правильный/неправильный) и в скрытом span правильный ответ на данный вопрос
        for (let i = 0; i<testData.length; i++){
            let text = `<li class="result_title_answer">${testData[i].question}`;
            if(arr_res[i]){
                text+=`${iconCorrect}</li><span class="right_ans hidden">${testData[i].correct}</span>`;
                resultList.insertAdjacentHTML('beforeend',text);
            }
            else{
                text+=`${iconIncorrect}</li><span class="right_ans hidden">${testData[i].correct}</span>`;
                resultList.insertAdjacentHTML('beforeend',text);
            }
        }
        
        //На каждый вопрос добавляем функцию выбора этого вопроса
        const titles = resultList.querySelectorAll('.result_title_answer');
        titles.forEach(t => t.setAttribute('onclick', 'titleSelected(this)'));

        //Выходим из функции
        return;
    }

    //Ответ выбран
    if(a.classList.contains('disabled')){
        document.querySelector('.test_list').classList.remove('selected');
        count++;
        showQuestion(count);
    }
    //Ответ не выбран
    else{
        alert('Чтобы перейти к следующему вопросу, ответьте на данный')
    }
}

//Обработка выбора вопроса
function titleSelected(title){
    const all_titles = document.querySelectorAll('.result_title_answer');

    //Обращаемся к span, в котором храниться правильный ответ на данный вопрос 
    let right_ans = title.nextSibling;

    if (right_ans.classList.contains('hidden')){
        right_ans.classList.remove('hidden');
        for(el of all_titles){
            //Когда нам открыт правильный ответ на данный вопрос, нажатие на другие вопросы заблокировано 
            if(el != title){
                el.classList.add('disabled');
            }
        }
    }
    else{
        right_ans.classList.add('hidden')
        for(el of all_titles){
            if(el != title){
                el.classList.remove('disabled');
            }
        }
    }
}

//Перемешивание элементов в массиве
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    //меняем элементы местами
    let t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
}