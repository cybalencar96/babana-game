import { IPosition } from "./contracts/interfaces";

export class Player {
    gameScreenWidth: number;

    hitBoxHeight: number;
    hitBoxWidth: number;
    speed: number;

    private position: IPosition;
    private life: number;
    private maxLife: number;
    private direction: string;

    constructor (gameScreenWidth: number, gameScreenHeight: number) {
        this.gameScreenWidth = gameScreenWidth;

        this.position = {
            x: this.gameScreenWidth / 2,
            y:gameScreenHeight - 170,
        }

        this.hitBoxWidth = 60;
        this.hitBoxHeight = 120;

        this.maxLife = 4;
        this.life = this.maxLife;
        this.speed = 3;
        this.direction = 'right';
    }

    validateX (x: number) {
        if (x > 0 && (x + this.hitBoxWidth) < this.gameScreenWidth) return true
    }

    move(direction: string) {
        this.direction = direction;
        let newX;

        if (direction === 'left') newX = this.position.x - this.speed;
        if (direction === 'right') newX = this.position.x + this.speed;

        if (this.validateX(newX)) this.position.x = newX;
    }

    getPosition () {
        return this.position;
    }

    getLife() {
        return this.life;
    }
    
    getMaxLife() {
        return this.maxLife;
    }

    getHitbox () {
        return {
            width: this.hitBoxWidth,
            height: this.hitBoxHeight,
        }
    }

    getDirection () {
        return this.direction;
    }

    loseLife () {
        this.life -= 1;
    }
}