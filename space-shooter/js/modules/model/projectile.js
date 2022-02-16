import game from './../controller/game.js';

export default class Projectile{
    constructor(x, y, color, type) {
        this.x = x;
        this.y = y;
        this.speed = 8;
        this.color = color;
        this.type = type;
    }

    update(index) {
        this.y -= this.speed;

        // Remove projectile from projectiles array if it falls below view
        if(this.y <= 0) game.projectiles.splice(index, 1);
    }

    draw(x, y, context, color, index) {
        context.beginPath();
        // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
        //context.arc(x, y, 5, 0, 2 * Math.PI);
        
        //ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, counterclockwise]);
        context.ellipse(x, y, 3, 8, Math.PI, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.filter = "blur(1px)";
        context.fill();
        context.closePath();

        this.update(index);
    }
}