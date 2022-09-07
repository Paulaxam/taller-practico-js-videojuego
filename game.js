const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize 

//Para evitar errores de carga, esperamos que cargue todo el html antes de inicializar el render del canvas
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

function getMaps(level) {
    const mapRows = maps[level].trim().split('\n');
    const mapCol = mapRows.map(row => row.trim().split(''));
    return mapCol
}

function startGame() {
    // game.fillRect(0,0,100,100); //Dibuja rectangulo relleno, params (x0,y0,x1,y1)
    // game.clearRect(50,0,75,75); //Borra un area rectangular, params (x0,y0,x1,y1)
    // game.font = '25px Verdana' //Definir el estilo de fuente, siempre debe llevar tamaño y fuente
    // game.fillStyle = 'purple' //Relleno de cualquier figura que creamos
    // game.textAlign = 'center' //Puede ser start, end, center, left, right (pone la mitad del texto en la coordenada que le indicamos en fillText, o el fin, el el inicio, de acuerdo a lo que elejimos)
    // game.fillText('Platzi',50,50);

    //Condiciones de inicialización de juego
    game.textAlign = 'end';
    game.font = `${elementSize*0.9}px Verdana`;
    
    map = getMaps(1);
    map.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize * (colIndex+1);
            const posY = elementSize * (rowIndex+1);
            game.fillText(emojis[col],posX,posY);
        });
    });
}