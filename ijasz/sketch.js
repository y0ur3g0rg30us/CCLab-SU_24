function setup() {
    let cnv = createCanvas(900, 400);
    cnv.parent("canvas-parent");
  }
  
  
  function draw() {
    background(0);
  
    fill(255);
    circle(width/2, height/2, 275);

    fill(155)
    circle(width/2, height/2, 175);
  }