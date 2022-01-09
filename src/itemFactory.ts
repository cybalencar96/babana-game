import { Orange } from './Orange';
import { Apple } from './Apple';
import { Watermelon } from './Watermelon';
import { Strawberry } from './Strawberry';
import { Banana } from './Banana';
import { getRandomInt } from './helpers/globalFunctions';
import { Bomb } from './Bomb';
import { Game } from './Game';

export function genRandomItem (game: Game) {
    const random = Math.random();
    const randXPos = getRandomInt(0, game.gameScreenWidth);

    if (random >= 0 && random <= 0.3) return new Orange({ x: randXPos, y: game.topbarHeight });
    if (random > 0.3 && random <= 0.6) return new Apple({ x: randXPos, y: game.topbarHeight });
    if (random > 0.6 && random <= 0.8) return new Watermelon({ x: randXPos, y: game.topbarHeight });
    if (random > 0.8 && random <= 0.95) return new Strawberry({ x: randXPos, y: game.topbarHeight });
    if (random > 0.95 && random <= 1) return new Banana({ x: randXPos, y: game.topbarHeight });
}

export function genBomb (game: Game) {
    const randXPos = getRandomInt(0, game.gameScreenWidth);
    return new Bomb({ x: randXPos, y: game.topbarHeight });
}