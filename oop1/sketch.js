let taxi1;
let taxi2;

let honk1;
let honk2;
let weeweewoowoo;

function preload(){
  honk1= loadSound("assests/honk1.mp3")
  honk2= loadSound("assests/hink2.mp3")
  weeweewoowoo= loadSound("assests/ambience.mp3")

}

function mousePressed(){
  weeweewoowoo.loop();
}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent");


    taxi1 = new Taxi(100, 100, 0.5);
    taxi2 = new Taxi(300, 100, 0.8);
    
}

function draw() {

    background(10, 50, 220);

    taxi1.update();
    taxi1.display();
    taxi1.maybeHonk();

    taxi2.update();
    taxi2.display();

    
}

class Taxi{
    constructor(startX, startY, scaleFactor){
        this.x = startX;
        this.y = startY;
        this.s = scaleFactor;

        this.speed = random(1, 3);
        this.wheelAngle = 45;
        this.wheelSpeed = 2;
    }

    update(){
        this.wheelAngle+=this.wheelSpeed;

        this.x+=this.speed;

        if(this.x > width){
            this.x = 0;
        }

        if(this.x < 0){
            this.x = width;
        }

    }

    maybeHonk(){
      if(random(0,1000)<1){
        if(random()<0.5){
            honk1.play()
        } else{
            honk2.play()
        }
      }
    }
    
    display(){
        push();
        translate(this.x, this.y);
        scale(this.s);

            noStroke();
            fill(240, 220, 60);

            // base:
            rect(-50, -50, 100, 30);
            // top"
            rect(-25, -70, 50, 20);
            // wheel 1:
            this.drawWheel(-30, -15);
            // wheel 2:
            this.drawWheel( 30, -15);

            // just to see origin 
            // of translation matrix:
            fill("red");
            circle(0, 0, 5); 

        pop();
    }
    
    drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        rotate(radians(this.wheelAngle));

            noStroke();
            fill(0);
            ellipse(0,0,30, 27);

        pop();
    }
}