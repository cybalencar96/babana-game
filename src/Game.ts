export class Game {
    context: CanvasRenderingContext2D;
    gameScreenWidth: number;
    gameScreenHeight: number;

    constructor (context: CanvasRenderingContext2D, gameScreenWidth: number, gameScreenHeight: number) {
        this.context = context;
        this.gameScreenHeight = gameScreenHeight;
        this.gameScreenWidth = gameScreenWidth;
    }

    drawBackground() {
        this.context.fillStyle = '#252525';
        this.context.fillRect(0, 0, this.gameScreenWidth, this.gameScreenHeight);
        
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.gameScreenWidth, 100);
        
        this.context.moveTo(0, this.gameScreenHeight - 50);
        this.context.lineTo(this.gameScreenWidth, this.gameScreenHeight - 50);
        this.context.strokeStyle = 'grey';
        this.context.stroke();
    }

    drawPlayer () {
        const player = new Image(60,60);
        player.src = './assets/sprites/alien.png'
        player.onload = () => this.context.drawImage(player, this.gameScreenWidth / 2, this.gameScreenHeight - 170, 60, 120);
    }
    
    start () {
        this.drawBackground();
        this.drawPlayer();
    }
}