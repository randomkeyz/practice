const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;

        // Handling img
        const image = new Image();
        image.src = 'images/spaceship.png';

        // Adding onload in case image is taking time to load
        image.onload = () => {
            const scale = 0.15; // Setting value to const to make things more descriptive when using
            this.width = image.width * scale; // Multiplying by scale to shrink img while keeping aspect ratio
            this.height = image.height * scale; // Multiplying by scale to shrink img while keeping aspect ratio
            this.image = image;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 30
            }
        }
    }

    draw(){
        //context.fillStyle = 'red';
        //context.fillRect(this.position.x, this.position.y, this.width, this.height);

        context.save();
        context.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        );
        context.rotate(this.rotation);
        context.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        );
        // Runs drawImage only if image is present and done loading
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        ); 
        context.restore();
    }

    update() {
        if(this.image){
            this.draw();
            this.position.x += this.velocity.x;
        }
    }
}

class Projectile {
    constructor() {
        
    }
}

const player = new Player();
// Keys we want to monitor
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
};

// Loop drawing of image
const animate = () => {
    requestAnimationFrame(animate);

    // Adding bg fill
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.update();

    if(keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -7;
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7;
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
}
animate();

addEventListener('keydown', ({key}) => {
    //console.log(key);

    switch(key){
        case 'a':
            keys.a.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case ' ':
            console.log('shoot');
            break;
    }
});

addEventListener('keyup', ({key}) => {
    //console.log(key);

    switch(key){
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case ' ':
            console.log('shoot');
            break;
    }
});