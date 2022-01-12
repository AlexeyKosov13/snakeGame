let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/bg.png';

const foodImg = new Image();
foodImg.src = 'img/carrot.png';

const startBtn = document.querySelector('.start__btn');
const easyBtn = document.querySelector('.easy__btn');
const normalBtn = document.querySelector('.normal__btn');
const hardBtn = document.querySelector('.hard__btn');
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
    // размещаем еду
    let food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };

    let snake = [];
    // начальная точка
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };

    let dir;

// управление
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

// замыкание на себя
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            
            clearInterval(game);
            startBtn.classList.remove('hide');
    }
};
    
    // рисуем игру
function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

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
        clearInterval(game);
        startBtn.classList.remove('hide');
        
    }
        
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);

    };

    document.addEventListener('keydown', direction);

    let game = setInterval(drawGame, option);
};




// ============перезапуск================ 

startBtn.addEventListener('click', startGame);








