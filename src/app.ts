import { Game } from "./Game";

const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const gameScreenWidth = 500; 
const gameScreenHeight = window.innerHeight; 

canvas.width = gameScreenWidth;
canvas.height = gameScreenHeight;

const context: CanvasRenderingContext2D = canvas.getContext('2d');


const game = new Game (context, gameScreenWidth, gameScreenHeight);

addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight') {
        game.turnOffPlayerMovement();
        game.turnOnPlayerMovement('right');
    }

    if (event.key === 'ArrowLeft') {
        game.turnOffPlayerMovement();
        game.turnOnPlayerMovement('left');
    }

    if (event.key === 'ArrowDown') {
        game.turnOffPlayerMovement();
    }
});
game.start();







