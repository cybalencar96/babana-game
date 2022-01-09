import { Item } from "./Item";
import { IPosition, IHitbox } from './contracts/interfaces';

const bananaImageDir = './assets/sprites/banana.png'
const bananaHitBox = {
    width: 30,
    height: 50,
}

export class Banana extends Item {
    private imageDir: string;
    private imageHitbox: IHitbox;

    constructor (position: IPosition) {
        super(position, bananaHitBox, 'banana', 0);
        this.imageDir = bananaImageDir;
        this.imageHitbox = bananaHitBox;
    }

    getImage () {
        return {
            dir: this.imageDir,
            hitbox: this.imageHitbox,
        }
    }


}