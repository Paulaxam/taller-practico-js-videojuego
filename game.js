const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');
const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
const maxLevel = maps.length + 1;

let bombsPositions = [];
let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let startTime;
let playerTime;
let intervalTime;



window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    let wHeight = window.innerHeight;
    let wWidth = window.innerWidth;
    
    (wHeight < wWidth)
        ? canvasSize = wHeight * 0.8
        : canvasSize = wWidth * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize/10;

    startGame();
}

function getMaps() {
    const map = maps[level];
    if(!map) {
        return
    }
    const mapRows = map.trim().split('\n');
    const mapCol = mapRows.map(row => row.trim().split(''));
    return mapCol
}

function startGame() {
    game.textAlign = 'end';
    game.font = `${elementSize*0.9}px Verdana`;
    map = getMaps();
    if(!map) {
        gameWin();
        return
    }

    if (!startTime) {
        startTime = Date.now();
        intervalTime = setInterval(showTime,100);
    }

    showLives();
    game.clearRect(0,0,canvasSize,canvasSize);
    bombsPositions = [];
    map.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize * (colIndex+1);
            const posY = elementSize * (rowIndex+1);

            if(col == 'O' && !playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            } else if(col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col == 'X') {
                bombsPositions.push({x:posX, y:posY});
            }

            game.fillText(emojis[col],posX,posY);
        });
    });
    movePlayer();
};

function movePlayer() {
    const giftColisionX = playerPosition.x.toFixed(4) == giftPosition.x.toFixed(4);
    const giftColisionY = playerPosition.y.toFixed(4) == giftPosition.y.toFixed(4);
    const giftColision = giftColisionX && giftColisionY;

    if(giftColision) levelUp();  
    
    const bombColision = bombsPositions.find(bomb =>{
        const bombColisionX = bomb.x.toFixed(4) == playerPosition.x.toFixed(4);
        const bombColisionY = bomb.y.toFixed(4) == playerPosition.y.toFixed(4);
        return bombColisionX && bombColisionY
    });

    if(bombColision) {
        game.fillText(emojis['BOMB_COLLISION'],playerPosition.x+elementSize/2,playerPosition.y-elementSize/2);
        setTimeout(gameLost,300);
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
}

function levelUp() {
        level += 1;
        startGame();
}

function gameWin() {
    clearInterval(intervalTime);
    console.log('you win')
}

function gameLost() {
    lives -= 1
   if(lives <= 0) {
    level = 0;
    lives = 3;
    clearInterval(intervalTime);
    startTime = undefined;
   };
    playerPosition.x = undefined;
    playerPosition.y =undefined;
    startGame();
}

function showLives() {
    spanLives.innerHTML = Array(lives).fill(emojis['HEART']).join('');
}

function showTime() {
    spanTime.innerHTML = Date.now() - startTime;
}

window.addEventListener('keydown', keyMovement)
btnUp.addEventListener('click',moveUp);
btnDown.addEventListener('click',moveDown);
btnRight.addEventListener('click',moveRight);
btnLeft.addEventListener('click',moveLeft);

function keyMovement(event) {
    let key = event.key;

    switch (key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
};

function moveUp() {
    if(playerPosition.y - elementSize > 0) {
        playerPosition.y -= elementSize;
        startGame();
    }
}

function moveDown() {
    if(playerPosition.y + elementSize <= canvasSize){
        playerPosition.y += elementSize;
        startGame();
    }
}

function moveRight() {
    if(playerPosition.x + elementSize <= canvasSize) {
        playerPosition.x += elementSize;
        startGame();
    }  
}

function moveLeft() {
    if(playerPosition.x - elementSize > 0) {
        playerPosition.x -= elementSize;
        startGame();
    }
}