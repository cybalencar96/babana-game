interface IHitbox {
    width: number;
    height: number;
}

interface IPosition {
    x: number;
    y: number;
}

interface IImage {
    dir: string,
    hitbox: IHitbox,
}

export {
    IHitbox,
    IPosition,
    IImage,
}