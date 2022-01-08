const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const gameScreenWidth = 500; 
const gameScreenHeight = window.innerHeight; 

canvas.width = gameScreenWidth;
canvas.height = gameScreenHeight;


const context: CanvasRenderingContext2D = canvas.getContext('2d');


context.fillStyle = '#252525';
context.fillRect(0, 0, gameScreenWidth, gameScreenHeight);

context.fillStyle = 'black';
context.fillRect(0, 0, gameScreenWidth, 100);

context.moveTo(0, gameScreenHeight - 50);
context.lineTo(gameScreenWidth, gameScreenHeight - 50);
context.strokeStyle = 'grey';
context.stroke();