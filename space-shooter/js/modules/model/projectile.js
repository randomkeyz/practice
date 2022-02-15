import game from './../controller/game.js';

export default class Projectile{
    constructor(x, y, color, direction, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.direction = direction;
    }

    update(index) {
        this.y -= 1;

        // Remove projectile from projectiles array if it falls below view
        if(this.y <= 0) game.projectiles.splice(index, 1);
    }

    draw(x, y, context, color, index) {
        context.beginPath();
        // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.closePath();

        this.update(index);
    }
}