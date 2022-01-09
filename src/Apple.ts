import { Item } from "./Item";
import { IPosition, IHitbox } from './contracts/interfaces';

const appleImageDir = './assets/sprites/red-apple.png'
const appleHitBox = {
    width: 30,
    height: 50,
}

export class Apple extends Item {
    private imageDir: string;
    private imageHitbox: IHitbox;

    constructor (position: IPosition) {
        super(position, appleHitBox, 'apple', 10);
        this.imageDir = appleImageDir;
        this.imageHitbox = appleHitBox;
    }

    getImage () {
        return {
            dir: this.imageDir,
            hitbox: this.imageHitbox,
        }
    }


}