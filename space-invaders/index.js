const scoreEl = document.querySelector('#scoreEl');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;
        this.opacity = 1;

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
        context.globalAlpha = this.opacity;
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
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 4;
    }

    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Particle {
    constructor({position, velocity, radius, color, fades}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades
    }

    draw() {
        context.save();
        context.globalAlpha = this.opacity;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.fades) this.opacity -= 0.01;
    }
}

class InvaderProjectile {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;

        this.width = 3;
        this.height = 10;
    }

    draw() {
        context.fillStyle = 'white';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }

        // Handling img
        const image = new Image();
        image.src = 'images/invader.png';

        // Adding onload in case image is taking time to load
        image.onload = () => {
            const scale = 1; // Setting value to const to make things more descriptive when using
            this.width = image.width * scale; // Multiplying by scale to shrink img while keeping aspect ratio
            this.height = image.height * scale; // Multiplying by scale to shrink img while keeping aspect ratio
            this.image = image;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw(){
        //context.fillStyle = 'red';
        //context.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Runs drawImage only if image is present and done loading
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        ); 
    }

    update({velocity}) {
        if(this.image){
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invaderProjectiles){
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }));
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = [];

        const columns = Math.floor(Math.random() * 10 + 5);
        const rows = Math.floor(Math.random() * 5 + 2);

        this.width = columns * 30;

        for(let x = 0;  x < columns; x++){
            for(let y = 0;  y < rows; y++){
                this.invaders.push(
                    new Invader({
                        position: {
                            x: x * 30,
                            y: y * 30
                        }
                    })
                )
            }
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 30;
        }
    }
}

const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];

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

let frames = 0;
let randomInt = Math.floor((Math.random() * 500) + 500);
let game = {
    over: false,
    active: true
}
let score = 0;

for(let i = 0; i < 15; i++){
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: 0.3
        },
        radius: Math.random() * 3,
        color: 'white'
    }));
}

let createParticles = ({object, color, fades}) => {
    for(let i = 0; i < 100; i++){
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 2,
            color: color || '#BAA0DE',
            fades: true
        }));
    }
}

// Loop drawing of images
const animate = () => {
    if(!game.active) return;

    requestAnimationFrame(animate);

    // Adding bg fill
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    player.update();

    particles.forEach((particle, i) => {

        if(particle.position.y - particle.radius >= canvas.height){
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }

        if(particle.opacity <= 0){
            setTimeout(() => {
                particles.splice(i, 1);
            }, 0);
        } else particle.update();
    });

    //console.log(particles);

    invaderProjectiles.forEach((invaderProjectile, index) => {
        if(invaderProjectile.position.y + invaderProjectile.height >= canvas.height){
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
            }, 0);
        } else invaderProjectile.update();
        
        // Projectile hits player
        if(
            invaderProjectile.position.y + invaderProjectile.height >= player.position.y && 
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width
        ) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
                player.opacity = 0;
                game.over = true;
            }, 0);

            setTimeout(() => {
                game.active = false;
            }, 2000);

            createParticles({
                object: player,
                color: 'white',
                fades: true
            });
        }
    });


    // Handling projectiles
    projectiles.forEach((projectile,index) => {
        // Checks if projectile is offscreen and removes from array if yes
        if(projectile.position.y + projectile.radius <= 0){
            // Adds one additional frame to the screen to prevent projectile from flashing
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        } else {
            projectile.update();
        }
    });

    // Handling invader grids
    grids.forEach((grid, gridIndex) => {
        grid.update();

        // spawn projectiles
        if(frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity});

            // Projectiles hit enemy
            projectiles.forEach((projectile, j) => {
                // Collision detection
                if (
                    projectile.position.y - projectile.radius <= invader.position.y + invader.height && 
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y
                ) {

                    setTimeout(() => {
                        // Check to make sure the invader we want to splice out is actually in the invaders array
                        const invaderFound = grid.invaders.find(invader2 => invader2 === invader);
                        //Check to make sure the projectile we want to splice out is in the array
                        const projectileFound = projectiles.find(projectile2 => projectile2 === projectile);

                        // Remove invaders and projectiles
                        if(invaderFound && projectileFound){
                            score += 100;
                            scoreEl.innerHTML = score;
                            // Setting particles
                            createParticles({
                                object: invader,
                                fades: true
                            });

                            grid.invaders.splice(i, 1);
                            projectiles.splice(j, 1);

                            // Updates size of grid as enemies are destroyed from the sides
                            if(grid.invaders.length > 0){
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                                grid.position.x = firstInvader.position.x;
                            } else {
                                grids.splice(gridIndex,1);
                            }
                        }
                    }, 0);
                }
            });
        });
    });

    // Handling player movement
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

    // spawning enemies
    if(frames % randomInt === 0){
        grids.push(new Grid());
        randomInt = Math.floor((Math.random() * 500) + 500);
        frames = 0;
    }

    frames++;
}
animate();

addEventListener('keydown', ({key}) => {
    if(game.over) return

    //console.log(key);
    switch(key){
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = true
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = true
            break;
        case ' ':
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                })
            );
            break;
    }
});

addEventListener('keyup', ({key}) => {
    //console.log(key);
    switch(key){
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = false
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = false
            break;
        case ' ':
            break;
    }
});