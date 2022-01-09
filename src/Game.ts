import { Player } from './Player';
import { Item } from './Item';
import { Banana } from './Banana';
import { getRandomInt } from './helpers/globalFunctions';
import { Orange } from './Orange';
import { Apple } from './Apple';
import { Watermelon } from './Watermelon';
import { Strawberry } from './Strawberry';
import { Bomb } from './Bomb';

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
        // this.checkItemOutOfScreen(item);
        item.move();
    }

    drawItems () {
        this.items.map(item => {
            this.drawItem(item);
        });
    }

    genRandomItem () {
        const random = Math.random();
        const randXPos = getRandomInt(0, this.gameScreenWidth);

        if (random >= 0 && random <= 0.3) return new Orange({ x: randXPos, y: this.topbarHeight });
        if (random > 0.3 && random <= 0.6) return new Apple({ x: randXPos, y: this.topbarHeight });
        if (random > 0.6 && random <= 0.8) return new Watermelon({ x: randXPos, y: this.topbarHeight });
        if (random > 0.8 && random <= 0.95) return new Strawberry({ x: randXPos, y: this.topbarHeight });
        if (random > 0.95 && random <= 1) return new Banana({ x: randXPos, y: this.topbarHeight });
    }

    genBomb() {
        const randXPos = getRandomInt(0, this.gameScreenWidth);
        return new Bomb({ x: randXPos, y: this.topbarHeight });
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
            }

            if (item.getType() === 'banana') {
                this.score *= 2;
            } else {
                this.score += item.getValue();
            }
        }
    }

    checkGameOver () {
        if (this.player.getLife() === 0) {
            alert('END GAME - Score: ' + this.score);
            window.location.reload();
        }
    }

    checkItemOutOfScreen (item: Item) {
        if (item.getPosition().y >= this.gameScreenHeight) {
            this.destroyItem(item);
        }
    }

    destroyItem (item: Item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
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
            this.items.push(this.genRandomItem());
        }, 1500);

        setInterval(() => {
            this.items.push(this.genBomb());
        }, 1500);
    }
}