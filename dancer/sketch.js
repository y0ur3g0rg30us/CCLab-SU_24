/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new JuanDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); 

  dancer.update();
  dancer.display();
}

class JuanDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle=0;
    this.speed=6;
    this.direction=1;
    this.rotation= 0;

  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.angle+= this.speed* this.direction;

    if(this.angle>=360|| this.angle<= -360){
      this.angle=0;
      this.direction*=-1;
      this.rotation++;
    }

  }

  // move(){
  //   this.angle+=this.speed;



  // }
  display() {
    push();
    translate(this.x, this.y);
    // ******** //
    // ⬇️ draw your dancer from here ⬇️
   rotate(radians(this.angle));

    // cup
    fill(255,150);
    noStroke();
    beginShape();
    vertex(-50,-100);
    vertex(50,-100);
    vertex(30,25);
    vertex(-30,25);
    endShape();

    // handle
    fill(250,150);
    strokeWeight(10);
    beginShape();
    vertex(50,-80);
    bezierVertex(80,-80,80,-20,35,20);
    endShape();

    //liquid
    fill(242,142,28)
    beginShape();
    vertex(-45,-95);
    vertex(45,-95);
    vertex(27,20);
    vertex(-27,20);
    endShape();

    // foam
    fill(255); 
    ellipse(0, -110, 120, 40); 
    ellipse(-40, -90, 40, 20);
    ellipse(40, -90, 40, 20);
    
    // eyes
    fill(0);
    ellipse(-20,-105,10,10);
    ellipse(20,-105,10,10);

    // mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0,-75,20,10,0,PI);

    // arms & legs
    strokeWeight(4);
    beginShape();
    stroke(255)
    line(-30, 0, -70, -30);
    line(30,0,70,-30);
    line(-20,25,-20,70);
    line(20,25,20,70);
    endShape();

 
    

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();

    
  }

  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/