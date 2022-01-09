import { Item } from "./Item";
import { IPosition, IHitbox } from './contracts/interfaces';

const orangeImageDir = './assets/sprites/orange.png'
const orangeHitBox = {
    width: 30,
    height: 50,
}

export class Orange extends Item {
    private imageDir: string;
    private imageHitbox: IHitbox;

    constructor (position: IPosition) {
        super(position, orangeHitBox, 'orange', 5);
        this.imageDir = orangeImageDir;
        this.imageHitbox = orangeHitBox;
    }

    getImage () {
        return {
            dir: this.imageDir,
            hitbox: this.imageHitbox,
        }
    }


}