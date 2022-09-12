const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');
const spanRecord = document.getElementById('record');
const spanLevel = document.getElementById('level')
const btnReload = document.getElementById('refresh');
const btnReset = document.getElementById('reset');
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
    canvas.setAttribute('height', canvasSize+10);

    elementSize = Math.floor(canvasSize/10);

    playerPosition.x = undefined;
    playerPosition.y = undefined;
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
    game.font = `${elementSize*0.9}px Combo`;
    map = getMaps();
    if(!map) {
        gameWin();
        return
    }

    if (!startTime) {
        startTime = Date.now();
        intervalTime = setInterval(showTime,100);
        showRecord();
    }

    showLevel();
    showLives();
    game.clearRect(0,0,canvasSize,canvasSize+10);
    bombsPositions = [];
    map.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = (elementSize) * (colIndex+1);
            const posY = (elementSize) * (rowIndex+1);

            if(col == 'O' && !playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            } else if(col == 'I' || col == 'F') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col == 'X' || col == 'Y' || col == 'Z') {
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

    if(giftColision) {
        game.fillText(emojis['WIN'],playerPosition.x,playerPosition.y);
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        setTimeout(levelUp,300);
    } else {
        const bombColision = bombsPositions.find(bomb =>{
            const bombColisionX = bomb.x.toFixed(4) == playerPosition.x.toFixed(4);
            const bombColisionY = bomb.y.toFixed(4) == playerPosition.y.toFixed(4);
            return bombColisionX && bombColisionY
        });

        if(bombColision) {
            game.fillText(emojis['BOMB_COLLISION'],playerPosition.x,playerPosition.y);
            playerPosition.x = undefined;
            playerPosition.y = undefined;
            setTimeout(gameLost,300);
        }
    
    }
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
}

function levelUp() {
        level += 1;
        startGame();
}

function gameWin() {
    clearInterval(intervalTime);
    gameRecord();
}

function gameRecord() {
    const recordTime = localStorage.getItem('record_time');
    const playerTime =  Date.now() - startTime;
    game.textAlign = 'center';
    game.font = `${elementSize*0.9}px Combo`;
    game.fillStyle = 'white';
    game.clearRect(0,0,canvasSize,canvasSize+10);
    if(recordTime) {
        if(recordTime >= playerTime) {
            localStorage.setItem('record_time',playerTime);
            game.fillText('New Record:',canvasSize/2,canvasSize/2-elementSize);
            game.fillText(`${emojis['CUP']} ${playerTime}`,canvasSize/2,canvasSize/2);
        } else {
            game.fillText('No new Record',canvasSize/2,canvasSize/2-elementSize);
            game.fillText(`TRY AGAIN!${emojis['GAME_OVER']}`,canvasSize/2,canvasSize/2);
        };
    } else {
        localStorage.setItem('record_time',playerTime);
        game.fillText('New record',canvasSize/2,canvasSize/2-elementSize);
        game.fillText(`${emojis['CUP']} ${playerTime}`,canvasSize/2,canvasSize/2);
    };
}

function gameLost() {
    lives -= 1
   if(lives <= 0) {
    level = 0;
    lives = 3;
    startTime = undefined;
   };
    playerPosition.x = undefined;
    playerPosition.y =undefined;
    startGame();
}

function showLives() {
    spanLives.innerHTML = Array(lives).fill(emojis['HEART']).join(' ');
}

function showLevel() {
    spanLevel.innerHTML = `${level + 1} / ${maxLevel}`;
}

function showTime() {
    spanTime.innerHTML = Date.now() - startTime;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

function milisecToMinSec(time) {
    let msToMinSec = undefined;
    msToMinSec = String(new Date(Number(time))).split(' ')[4].split(':');
    msToMinSec.shift();
    return msToMinSec.join(':');
}

window.addEventListener('keydown', keyMovement)
btnUp.addEventListener('click',moveUp);
btnDown.addEventListener('click',moveDown);
btnRight.addEventListener('click',moveRight);
btnLeft.addEventListener('click',moveLeft);
btnReload.addEventListener('click', reloadGame);
btnReset.addEventListener('click', resetGame);

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

function reloadGame() {
    location. reload();
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

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