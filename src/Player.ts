export class Player {
    gameScreenWidth: number;

    hitBoxHeight: number;
    hitBoxWidth: number;
    x: number;
    speed: number;

    private life: number;
    private maxLife: number;

    constructor (gameScreenWidth: number) {
        this.gameScreenWidth = gameScreenWidth;

        this.x = this.gameScreenWidth / 2;
        this.hitBoxWidth = 60;
        this.hitBoxHeight = 120;
        this.life = 3;
        this.maxLife = 4;
        this.speed = 5;
    }

    validateX (x: number) {
        if (x > 0 && x < this.gameScreenWidth) return true
    }

    move(direction: string) {
        let newX;

        if (direction === 'left') newX = this.x - this.speed;
        if (direction === 'right') newX = this.x + this.speed;

        if (this.validateX(newX)) this.x = newX;

        console.log(this.x)
    }

    getXPos () {
        return this.x;
    }

    getLife() {
        return this.life;
    }
    
    getMaxLife() {
        return this.maxLife;
    }

    getHitBox () {
        return {
            width: this.hitBoxWidth,
            height: this.hitBoxHeight,
        }
    }
}