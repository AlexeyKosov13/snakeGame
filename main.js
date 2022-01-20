let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d');

//======== создаем поле =======
const ground = new Image();
ground.src = 'img/bg.png';

// =======создаем еду========
const foodImg = new Image();
foodImg.src = 'img/carrot.png';

const startBtn = document.querySelector('.start__btn');
const easyBtn = document.querySelector('.easy__btn');
const normalBtn = document.querySelector('.normal__btn');
const hardBtn = document.querySelector('.hard__btn');
const modal = document.querySelector('.modal');

let option = 200;
let box = 32;


easyBtn.addEventListener('click', () => {
    option = 250;
    easyBtn.classList.add('choice__btn');
    normalBtn.classList.remove('choice__btn');
    hardBtn.classList.remove('choice__btn');      
});
hardBtn.addEventListener('click', () => {
    option = 70;
    hardBtn.classList.add('choice__btn');
    normalBtn.classList.remove('choice__btn');
    easyBtn.classList.remove('choice__btn');
    console.log(option);     
});
normalBtn.addEventListener('click', () => {
    option = 100;
    normalBtn.classList.add('choice__btn');
    easyBtn.classList.remove('choice__btn');
    hardBtn.classList.remove('choice__btn');
});
startGame();
// === функция перезапуска
function startGame() {
    let score = 0;
    //прячем кнопку старт
    startBtn.classList.add('hide');
    modal.classList.add('hide');

    // размещаем еду
    let food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };
//=======сама змейка=========
    let snake = [];

//======= начальная точка змейки======
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };

    let dir;

// ========управление змейкой=====
    function direction(event) {
    
    if (event.keyCode == 37 && dir != 'right')
        dir = 'left';
    else if (event.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 40 && dir != 'up')
        dir = 'down';
};

//=============замыкание на себя===========
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            showMessage(score);
            clearInterval(game);
            startBtn.classList.remove('hide'); 
        }       
    }
};
   
//==========в конце игры показ набранных очков========
    
function showMessage(data) {
    const scoreLine = document.querySelector('.modal__score');
    modal.classList.remove('hide');
    scoreLine.innerHTML = data;
};
    

// ===========рисуем игру каждые 100мс==============
    function drawGame() {
    //рамещаем поле
        ctx.drawImage(ground, 0, 0);
    //размещаем еду 
    ctx.drawImage(foodImg, food.x, food.y);
    
    //=======рисуем змейку========
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // =======текст счет==========
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    //=======первый элемент змейки======
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else
        snake.pop();
    
    // об стену
    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17) {
        showMessage(score);
        clearInterval(game);
        startBtn.classList.remove('hide');    
    }
        
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;
    
    //======объект головы=====
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    //=====закидываем координаты головы в массив==
    snake.unshift(newHead);
    };

    //===========запуск игры после нажатия любой клавиши
    document.addEventListener('keydown', direction);

    let game = setInterval(drawGame, option);
};




// ============перезапуск================ 

startBtn.addEventListener('click', startGame);








