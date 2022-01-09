import { IHitbox, IPosition, IImage } from "./contracts/interfaces";

export abstract class Item {
    private hitbox: IHitbox;
    private position: IPosition;
    private type: string;
    private value: number;

    constructor (position: IPosition, hitbox: IHitbox, type: string, value: number) {
        this.hitbox = hitbox;
        this.position = position;
        this.type = type;
        this.value = value;
    }

    move () {
        this.position.y += 2;
    }

    setStartingPoint (xPos: number): void {
        this.position.x = xPos;
    }

    getPosition (): IPosition {
        return this.position;
    }

    getHitbox (): IHitbox {
        return this.hitbox;
    }

    getType () {
        return this.type;
    }

    getValue () {
        return this.value;
    }

    abstract getImage (): IImage;
}

// se move (caindo)
// verifica colisao
// se destroi
