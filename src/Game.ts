import { Player } from './Player';
import { Item } from './Item';
import { genRandomItem, genBomb } from './itemFactory';

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
    items: Item[] = [];
    score: number;
    missingItems: number;

    constructor (context: CanvasRenderingContext2D, gameScreenWidth: number, gameScreenHeight: number) {
        this.context = context;
        this.fps = 1000 / 60;
        this.gameScreenHeight = gameScreenHeight;
        this.gameScreenWidth = gameScreenWidth;
        this.topbarHeight = 100;
        this.floorHeight = 50;
        this.lifeSize = 40;
        this.score = 0;
        this.player = new Player(this.gameScreenWidth, this.gameScreenHeight);
        this.idPlayerMovement;

        this.missingItems = 0;

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
            this.player.getPosition().x, 
            this.player.getPosition().y, 
            this.player.getHitbox().width, 
            this.player.getHitbox().height
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
        const centralizedHeightTopbarContent = this.topbarHeight / 2 + 5;
        this.context.fillStyle = "white";
        this.context.font = "25px Arial";
        this.context.fillText(`Score: ${this.score}`, 0.65 * this.gameScreenWidth, centralizedHeightTopbarContent);
    }

    drawItem (item: Item) {
        const itemImage = new Image();
        itemImage.src = item.getImage().dir;
        itemImage.onload = () => this.context.drawImage(
            itemImage, 
            item.getPosition().x, 
            item.getPosition().y, 
            item.getImage().hitbox.width, 
            item.getImage().hitbox.height,
        );

        this.checkColision(item);
        this.checkItemOutOfScreen(item);
        item.move();
    }

    drawItems () {
        this.items.map(item => {
            this.drawItem(item);
        });
    }

    turnOnPlayerMovement(direction: string) {
        if (direction !== 'left' && direction !== 'right') throw new Error ('direction invalid');

        this.idPlayerMovement = setInterval(() => {
            this.player.move(direction);
        }, this.fps);
    }

    turnOffPlayerMovement () {
       clearInterval(this.idPlayerMovement); 
    }

    checkColision (item: Item) {
        const itemXStart = item.getPosition().x;
        const itemXEnd = itemXStart + item.getHitbox().width;
        const itemYStart = item.getPosition().y;
        const itemYEnd = itemYStart + item.getHitbox().height;

        const playerXStart = this.player.getPosition().x;
        const playerYStart = this.player.getPosition().y;
        const playerXEnd = playerXStart + this.player.getHitbox().width;
        const playerYEnd = playerYStart + this.player.getHitbox().height;

        if (
            itemXStart >= playerXStart && itemXEnd <= playerXEnd &&
            itemYEnd >= playerYStart && !(itemYStart > playerYEnd)
        ) {
            this.destroyItem(item);

            if (item.getType() === 'bomb') {
                this.player.loseLife();
                this.checkGameOver();
                return;
            }

            this.missingItems = 0;

            if (item.getType() === 'banana') {
                this.score *= 2;
            } else {
                this.score += item.getValue();
            }
        }
    }

    checkItemOutOfScreen (item: Item) {
        if (item.getPosition().y >= this.gameScreenHeight) {
            if (item.getType() !== 'bomb') this.missingItems += 1;
            this.destroyItem(item);
            this.checkGameOver();
        }
    }

    destroyItem (item: Item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    checkGameOver () {
        if (this.missingItems === 4) {
            alert('END GAME - Score: ' + this.score);
            window.location.reload();  
        }

        if (this.player.getLife() === 0) {
            alert('END GAME - Score: ' + this.score);
            window.location.reload();
        }
    }

    gameLoop () {
        this.drawBackground();
        this.drawLives();
        this.drawScore();
        this.drawPlayer();
        this.drawItems();
    }

    start () {
        setInterval(() => {
            this.gameLoop();
        }, this.fps);

        setInterval(() => {
            this.items.push(genRandomItem(this.gameScreenWidth, this.topbarHeight));
        }, 1500);

        setInterval(() => {
            this.items.push(genBomb(this.gameScreenWidth, this.topbarHeight));
        }, 2000);
    }
}