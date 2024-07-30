let confettis = [];
let numConfetti = 50;
let backgroundHue;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < numConfetti; i++) {
    confettis.push(new Confetti(width / 2, height / 2))
  }

  colorMode(HSB);
  backgroundHue = random(0, 360);

}

function draw() {
  background(backgroundHue, 30, 100);

  // confettis.push(new Confetti(width/2, height/2))

  if (mouseIsPressed == true) {
    for (let i = 0; i < numConfetti; i++) {
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }

  for (let i = 0; i < confettis.length; i++) {
    confettis[i].update();
    confettis[i].display();
    confettis[i].checkOutofCanvas();
  }

  text(confettis.length, 20, 20)

  // if(confettis.length> 30){
  //   let idx= 0;
  //   confettis.splice(idx,1);
  // // }

  // if(confettis.length>1000){
  //   let idx=0
  //   confettis.splice(idx,confettis.length-100)
  // }
  for (let i = 0; i < confettis.length; i++) {
    if (confettis[i].onCanvas == false) {
      confettis.splice(i, 1)
    }
  }

}

class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);

    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);

    this.cHue = random(0, 360);

    this.onCanvas = true;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1;
    this.speedX *= .97;
  }
  display() {
    push();
    translate(this.x, this.y);

    fill(this.cHue, 100, 100);
    noStroke();
    circle(0, 0, this.size);

    pop();
  }

  checkOutofCanvas() {
    if (this.y > height) {
      this.onCanvas = false
    }
  }
}

// function mousePressed(){
//   for(let i = 0; i < numConfetti; i++){
//     confettis.push(new Confetti(mouseX, mouseY))
//   }
// }