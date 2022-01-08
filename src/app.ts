import { Game } from "./Game";

const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const gameScreenWidth = 500; 
const gameScreenHeight = window.innerHeight; 

canvas.width = gameScreenWidth;
canvas.height = gameScreenHeight;

const context: CanvasRenderingContext2D = canvas.getContext('2d');


const game = new Game (context, gameScreenWidth, gameScreenHeight);

game.start();







