import renderer from './../view/renderer.js';

export default class Particle {
    constructor({position, velocity, radius, color, fades}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.opacity = 1;
        this.fades = fades;
        this.color = color;
    }

    draw() {
        renderer.context.save();
        renderer.context.globalAlpha = this.opacity;
        renderer.context.beginPath();
        renderer.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        renderer.context.fillStyle = this.color;
        renderer.context.fill();
        renderer.context.closePath();
        renderer.context.restore();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x * 3;
        this.position.y += this.velocity.y * 3;

        if(this.fades) this.opacity -= 0.03;
    }
}

