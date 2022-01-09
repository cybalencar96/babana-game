import { Orange } from './Orange';
import { Apple } from './Apple';
import { Watermelon } from './Watermelon';
import { Strawberry } from './Strawberry';
import { Banana } from './Banana';
import { getRandomInt } from './helpers/globalFunctions';
import { Bomb } from './Bomb';

export function genRandomItem (gameScreenWidth: number, topbarHeight: number) {
    const random = Math.random();
    const randXPos = getRandomInt(0, gameScreenWidth);

    if (random >= 0 && random <= 0.3) return new Orange({ x: randXPos, y: topbarHeight });
    if (random > 0.3 && random <= 0.6) return new Apple({ x: randXPos, y: topbarHeight });
    if (random > 0.6 && random <= 0.8) return new Watermelon({ x: randXPos, y: topbarHeight });
    if (random > 0.8 && random <= 0.95) return new Strawberry({ x: randXPos, y: topbarHeight });
    if (random > 0.95 && random <= 1) return new Banana({ x: randXPos, y: topbarHeight });
}

export function genBomb (gameScreenWidth: number, topbarHeight: number) {
    const randXPos = getRandomInt(0, gameScreenWidth);
    return new Bomb({ x: randXPos, y: topbarHeight });
}