export class Game {
    context: CanvasRenderingContext2D;
    gameScreenWidth: number;
    gameScreenHeight: number;
    topbarHeight: number;
    floorHeight: number;
    lifeSize: number;

    constructor (context: CanvasRenderingContext2D, gameScreenWidth: number, gameScreenHeight: number) {
        this.context = context;
        this.gameScreenHeight = gameScreenHeight;
        this.gameScreenWidth = gameScreenWidth;
        this.topbarHeight = 100;
        this.floorHeight = 50;
        this.lifeSize = 40;
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

    drawLife (hasLife: boolean, xPos: number) {
        const life = new Image(60,60);
        life.src = hasLife ? './assets/sprites/heart.png' : './assets/sprites/heart-empty.png';

        const centralizedLifeHeight = this.topbarHeight / 2 - this.lifeSize / 2;

        life.onload = () => this.context.drawImage(life, xPos, centralizedLifeHeight, this.lifeSize, this.lifeSize);
    }

    drawLifes () {
        const lifes = [true, true, true, false]
        let xPos = 20;

        lifes.map(hasLife => {
            this.drawLife(hasLife, xPos);
            xPos += this.lifeSize + 20;
        })
    }

    drawScore () {
        const score = 157;
        const centralizedHeightTopbarContent = this.topbarHeight / 2 + 5;
        this.context.fillStyle = "white";
        this.context.font = "25px Arial";
        this.context.fillText(`Score: ${score}`, 0.65 * this.gameScreenWidth, centralizedHeightTopbarContent);
        
    }

    drawPlayer () {
        const player = new Image(60,60);
        player.src = './assets/sprites/alien.png'
        player.onload = () => this.context.drawImage(player, this.gameScreenWidth / 2, this.gameScreenHeight - 170, 60, 120);
    }
    
    start () {
        this.drawBackground();
        this.drawLifes();
        this.drawScore();
        this.drawPlayer();
    }
}