import { Item } from "./Item";
import { IPosition, IHitbox } from './contracts/interfaces';

const watermelonImageDir = './assets/sprites/watermelon.png'
const watermelonHitBox = {
    width: 30,
    height: 50,
}

export class Watermelon extends Item {
    private imageDir: string;
    private imageHitbox: IHitbox;

    constructor (position: IPosition) {
        super(position, watermelonHitBox, 'watermelon', 20);
        this.imageDir = watermelonImageDir;
        this.imageHitbox = watermelonHitBox;
    }

    getImage () {
        return {
            dir: this.imageDir,
            hitbox: this.imageHitbox,
        }
    }


}