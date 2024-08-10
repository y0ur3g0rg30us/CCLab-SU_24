let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let m1;
let m2;
let m3;
let m4;
let m5;
let m6;

let scalableImages = []; 

function preload() {
  img1 = loadImage('assests/2023.1.jpg');
  img2 = loadImage('assests/2023.2.png');
  img3 = loadImage('assests/2023.3.jpg');
  img4 = loadImage('assests/traveling.png');
  img5= loadImage('assests/2023.4.png');
  img6= loadImage('assests/2023.5.jpg');
  img7=loadImage('assests/2023.6.jpg');
  m1= loadSound('assests/a.mp3');
  m2= loadSound('assests/al.1.mp3');
  m3= loadSound('assests/club.mp3');
  m4=loadSound('assests/manager.mp3');
  m5=loadSound('assests/plane.mp3');
  m6=loadSound('assests/Z.mp3');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-parent");

  scalableImages.push(new ScalableImage(img1, width / 2 - 45 - 485, height - 120 - 350, 90, 70,m2));
  scalableImages.push(new ScalableImage(img2, width / 2 - 45 - 485, height - 180 - 425, 90, 120,m4));
  scalableImages.push(new ScalableImage(img3, width / 2 - 45 - 485, height - 100 - 280, 90, 120,m5));
  scalableImages.push(new ScalableImage(img5, width / 2 - 45 + 350, height - 350 - 290, 120, 120, m6));
  scalableImages.push(new ScalableImage(img7, width / 2 - 45 + 350, height - 150 - 180, 120, 100,m1));
  scalableImages.push(new ScalableImage(img6, width / 2 - 45 +350, height - 180 - 300, 200, 120, m3)); 
  

}

function draw() {
  background('#550000');

  // floor
  noStroke();
  fill('#e0b382');
  rect(0, width / 2 - 100, height * 2, 200);

  //  statue pedestal
  fill('#9a9a9a');
  rect(width / 2 - 75, height - 175, 150, 120);
  fill('#696969');
  quad(width / 2 - 75, height - 175, width / 2 + 75, height - 175, width / 2 + 45, height - 225, width / 2 - 45, height - 225);

  push();
  scale(1.3);
  image(img4, width / 2 - 190, height - 360, 90, 85);
  pop();

  for (let i = 0; i < scalableImages.length; i++) {
    scalableImages[i].update();
    scalableImages[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < scalableImages.length; i++) {
    scalableImages[i].toggleScale(mouseX, mouseY);
  }
}

class ScalableImage {
  constructor(img, x, y, w, h, audio) {
    this.img = img;
    this.originalX = x;
    this.originalY = y;
    this.originalW = w;
    this.originalH = h;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scaled = false;
    this.scaleFactor = 4;
    this.scalingSpeed = 10; 
  }

  update() {
    if (this.scaled) {
      this.targetW = this.originalW * this.scaleFactor;
      this.targetH = this.originalH * this.scaleFactor;
      this.targetX = width / 2 - this.targetW / 2;
      this.targetY = height / 2 - this.targetH / 2;
    } else {
      this.targetW = this.originalW;
      this.targetH = this.originalH;
      this.targetX = this.originalX;
      this.targetY = this.originalY;
    }

    this.w += (this.targetW - this.w) / this.scalingSpeed;
    this.h += (this.targetH - this.h) / this.scalingSpeed;
    this.x += (this.targetX - this.x) / this.scalingSpeed;
    this.y += (this.targetY - this.y) / this.scalingSpeed;
  }

  display() {
    image(this.img, this.x, this.y, this.w, this.h);
  }

  toggleScale(mx, my) {
    let d = dist(mx, my, this.x + this.w / 2, this.y + this.h / 2);
    if (d < this.w / 2) {
      this.scaled = !this.scaled;
      if(this.scaled){
        this.audio=this.audio.play();
      }
    }
  }
}
