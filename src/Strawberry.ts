import { Item } from "./Item";
import { IPosition, IHitbox } from './contracts/interfaces';

const strawberryImageDir = './assets/sprites/strawberry.png'
const strawberryHitBox = {
    width: 30,
    height: 50,
}

export class Strawberry extends Item {
    private imageDir: string;
    private imageHitbox: IHitbox;

    constructor (position: IPosition) {
        super(position, strawberryHitBox, 'strawberry', 30);
        this.imageDir = strawberryImageDir;
        this.imageHitbox = strawberryHitBox;
    }

    getImage () {
        return {
            dir: this.imageDir,
            hitbox: this.imageHitbox,
        }
    }


}