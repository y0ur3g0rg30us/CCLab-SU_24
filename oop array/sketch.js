let cow;
let cowIMG;

let cows=[];
let numCows= 20;

function preload(){
  cowIMG= loadImage("assests/cow-poster.png");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-parent");

    // cow= new Cow(200,300, cowIMG);

    for(let i=0; i<numCows; i++){
    let oneCow= new Cow(random(width),random(height), cowIMG);
    cows.push(oneCow)
    }

  }
  
  
  function draw() {
    background(0);

    // cow.display();
    // cow.update();
    for(let i=0; i<cows.length; i++){
      cows[i].display();
      cows[i].update();
    }
   
  }

  class Cow{
    constructor(startX, startY, cowimg){
        this.x=startX;
        this.y= startY;
        this.photo= cowimg;
        this.xSpeed= 1;
        this.ySpeed=1;

       
        this.scaleFactor= random(.4,.5);
    }

    update(){
      this.x+=this.xSpeed
      this.y+=this.ySpeed

      if(this.x>width){
        this.x=0
      }
    }

    display(){
        push();
        translate(this.x,this.y);
        scale(0.5);

        rect(0,0,50,50);
        let imgW= this.photo.width
        let imgH= this.photo.height
        image(this.photo,-imgW/2,-imgH+90);


        pop();
    }
}
