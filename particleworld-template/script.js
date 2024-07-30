// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 150; // Decide the initial number of particles.
let snowIMG;
let particles = [];

function preload(){
  snowIMG= loadImage("assests/images.jpeg")

}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);


  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = random(width);
    this.y = random(-50, -10);
    this.size = random(3, 7);
    this.speed = random(.25, 1.5);
    this.angle = random(TWO_PI);
    this.photo = snowIMG;

  }
  // methods (functions): particle's behaviors
  update() {
    // (add)
    this.x += sin(this.angle)
    this.y += this.speed;
    this.angle += .01


    if (this.y > height) {
      this.y = 0
    }

  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    scale(.13);

      let imgW= this.photo.width
      let imgH= this.photo.height
    image(this.photo,this.x,this.y);
    ellipse(this.x, this.y, this.size);

    pop();
  }
}
