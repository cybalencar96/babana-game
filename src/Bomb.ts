import { Item } from "./Item";
import { IPosition, IHitbox } from './contracts/interfaces';

const bombImageDir = './assets/sprites/bomb.png'
const bombHitBox = {
    width: 30,
    height: 50,
}

export class Bomb extends Item {
    private imageDir: string;
    private imageHitbox: IHitbox;

    constructor (position: IPosition) {
        super(position, bombHitBox, 'bomb', 0);
        this.imageDir = bombImageDir;
        this.imageHitbox = bombHitBox;
    }

    getImage () {
        return {
            dir: this.imageDir,
            hitbox: this.imageHitbox,
        }
    }


}