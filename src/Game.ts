import { Player } from "./Player";

export class Game {
    context: CanvasRenderingContext2D;
    gameScreenWidth: number;
    gameScreenHeight: number;
    topbarHeight: number;
    floorHeight: number;
    lifeSize: number;
    player: Player;
    idPlayerMovement: any;
    fps: number;

    constructor (context: CanvasRenderingContext2D, gameScreenWidth: number, gameScreenHeight: number) {
        this.context = context;
        this.fps = 1000 / 120;
        this.gameScreenHeight = gameScreenHeight;
        this.gameScreenWidth = gameScreenWidth;
        this.topbarHeight = 100;
        this.floorHeight = 50;
        this.lifeSize = 40;

        this.player = new Player(this.gameScreenWidth);
        this.idPlayerMovement;
    }

    drawBackground() {
        this.context.fillStyle = '#252525';
        this.context.fillRect(0, 0, this.gameScreenWidth, this.gameScreenHeight);
        
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.gameScreenWidth, this.topbarHeight);
        
        this.context.moveTo(0, this.gameScreenHeight - this.floorHeight);
        this.context.lineTo(this.gameScreenWidth, this.gameScreenHeight - this.floorHeight);
        this.context.strokeStyle = 'grey';
        this.context.stroke();
    }

    drawPlayer () {
        const playerImg = new Image(60,60);
        playerImg.src = './assets/sprites/alien.png'
        playerImg.onload = () => this.context.drawImage(
            playerImg, 
            this.player.getXPos(), 
            this.gameScreenHeight - 170, 
            this.player.getHitBox().width, 
            this.player.getHitBox().height
        );
    }

    drawLife (hasLife: boolean, xPos: number) {
        const life = new Image(60,60);
        life.src = hasLife ? './assets/sprites/heart.png' : './assets/sprites/heart-empty.png';

        const centralizedLifeHeight = this.topbarHeight / 2 - this.lifeSize / 2;

        life.onload = () => this.context.drawImage(life, xPos, centralizedLifeHeight, this.lifeSize, this.lifeSize);
    }

    drawLives () {
        const currentPlayerLife = this.player.getLife();
        const playerMaxLife = this.player.getMaxLife();

        let xPos = 20;
        let qtyDrawed = 0;

        for (let i = 0; i < playerMaxLife; i++) {
            if (qtyDrawed < currentPlayerLife) this.drawLife(true, xPos);
            if (qtyDrawed >= currentPlayerLife) this.drawLife(false, xPos);
            
            qtyDrawed++;
            xPos += this.lifeSize + 20;
        }   
    }

    drawScore () {
        const score = 157;
        const centralizedHeightTopbarContent = this.topbarHeight / 2 + 5;
        this.context.fillStyle = "white";
        this.context.font = "25px Arial";
        this.context.fillText(`Score: ${score}`, 0.65 * this.gameScreenWidth, centralizedHeightTopbarContent);
    }

    turnOnPlayerMovement(direction: string) {
        if (direction !== 'left' && direction !== 'right') throw new Error ('direction invalid');

        this.idPlayerMovement = setInterval(() => {
            this.player.move(direction);
        }, 500);
    }

    turnOffPlayerMovement () {
       clearInterval(this.idPlayerMovement); 
    }

    gameLoop () {
        this.drawBackground();
        this.drawLives();
        this.drawScore();
        this.drawPlayer();
    }

    start () {
        setInterval(() => {
            this.gameLoop();
        }, this.fps)
    }
}