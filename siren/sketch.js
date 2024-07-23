let creatureX;
let creatureY;
let moveUp = false;
let upSpeed = 3;
let downSpeed = 3;
let sideSpeed = 3;
let r;
let size;
let fish = [];
let fishCount = 20;
let cx;
let cy;
let dia;
let gs1;
let bubbleCount = 20;
let bubbles = [];
let timer = 10;
let maxTimer = 10;
let timerStart = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 500);

  creatureX = width / 2;
  creatureY = height / 2;
  size = random(1, 1.5);
  r = 30;
  dia = 25;

  for (let i = 0; i < fishCount; i++) {
    fish.push({
      x: random(width),
      y: random(height),
      xSpeed: random(0.5, 1),
      ySpeed: random(0.5, 1),
      bodyColor: color(random(255), random(255), random(255)),
      finColor: color(random(255), random(255), random(255)),
      eyeColor: color(random(255), random(255), random(255)),
    });
  }

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      x: random(width),
      y: random(height + 10),
      d: random(10, 35),
      bSpeed: 3,
    });
  }
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
}

function draw() {
  background(83, 104, 114); // grayish

  if (!gameOver) {
    drawCave();

    drawUnderwaterPlant(width / 2, height - 50);
    drawUnderwaterPlant(width - 100, height - 100);
    drawUnderwaterPlant(width - 200, height - 25);
    drawUnderwaterPlant(width - 300, height - 50);
    drawUnderwaterPlant(width - 500, height - 75);
    drawUnderwaterPlant(width - 600, height - 50);
    drawUnderwaterPlant(width - 700, height - 25);

    drawCreature(creatureX, creatureY);

    if (keyIsDown(UP_ARROW)) {
      creatureY -= upSpeed;
    } else if (keyIsDown(DOWN_ARROW)) {
      creatureY += downSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
      creatureX -= sideSpeed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      creatureX += sideSpeed;
    }

    for (let i = fish.length - 1; i >= 0; i--) {
      moveFish(fish[i]);
      drawFish(fish[i]);

      if (
        fish[i].y > creatureY - 60 &&
        fish[i].y < creatureY - 20 &&
        fish[i].x > creatureX - 20 &&
        fish[i].x < creatureX + 20
      ) {
        fish.splice(i, 1);
        resetTimer();
      }
    }

    drawBubbles();

    updateTimer();
    displayTimer();
    displayFishCount();

    if (timer === 0) {
      gameOver = true;
    }
  } else {
    displayGameOver();
  }

}

function drawCave() {
  noStroke();
  fill(29, 162, 216); // blue
  ellipse(150, 250, 400, 300);
  ellipse(650, 250, 400, 300);
  ellipse(400, 250, 500, 400);
}

function drawCreature(x, y) {
  fill(100, 100, 150);
  noStroke();

  // body
  beginShape();
  vertex(x, y - 60);
  vertex(x - 20, y - 20);
  vertex(x - 30, y + 20);
  vertex(x - 40, y + 40);
  vertex(x - 20, y + 80);
  vertex(x, y + 100);
  vertex(x + 20, y + 80);
  vertex(x + 40, y + 40);
  vertex(x + 30, y + 20);
  vertex(x + 20, y - 20);
  endShape(CLOSE);

  // tail
  beginShape();
  vertex(x, y + 100);
  vertex(x - 20, y + 130);
  vertex(x - 10, y + 140);
  vertex(x - 30, y + 180);
  vertex(x, y + 150);
  vertex(x + 30, y + 180);
  vertex(x + 10, y + 140);
  vertex(x + 20, y + 130);
  endShape(CLOSE);

  // arms
  fill(80, 80, 130);
  ellipse(x - 45, y + 20, 20, 80);
  ellipse(x + 45, y + 20, 20, 80);

  // head
  fill(100, 100, 150);
  ellipse(x, y - 60, 40, 40);

  // eyes
  fill(0);
  ellipse(x - 10, y - 60, 5, 5);
  ellipse(x + 10, y - 60, 5, 5);
}

function moveFish(fish) {
  let distance = dist(fish.x, fish.y, creatureX, creatureY);
  let avoidanceDistance = 200;

  if (distance < avoidanceDistance) {
    let angle = atan2(fish.y - creatureY, fish.x - creatureX);
    fish.xSpeed = cos(angle) * 2;
    fish.ySpeed = sin(angle) * 2;
  } else {
    fish.xSpeed = random(0.5, 1);
    fish.ySpeed = random(0.5, 1);
  }

  fish.x += fish.xSpeed;
  fish.y += fish.ySpeed;

  if (fish.x > width) {
    fish.x = 0;
  }
  if (fish.x < 0) {
    fish.x = width;
  }
  if (fish.y > height) {
    fish.y = 0;
  }
  if (fish.y < 0) {
    fish.y = height;
  }
}

function drawFish(fish) {
  fill(fish.finColor);
  arc(fish.x - 30, fish.y, r - 8, r - 10, PI / 2, PI + HALF_PI);

  fill(fish.bodyColor);
  ellipse(fish.x, fish.y, size * 30, size * 15);

  fill(fish.eyeColor);
  ellipse(fish.x + 10, fish.y - 2, 7, 5);
}

function drawUnderwaterPlant(x, y) {
  push();
  translate(x, y);

  stroke(0, 100, 0);
  strokeWeight(4);
  fill(0, 150, 0);
  beginShape();
  for (let i = 0; i < TWO_PI; i += PI / 6) {
    let r = 20 + random(5);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);

  for (let i = 0; i < 6; i++) {
    let angle = random(PI / 6, PI / 3) * (random() < 0.5 ? -1 : 1);
    let length = random(100, 150);
    drawBranch(0, 0, angle, length);
  }

  pop();
}

function drawBranch(x, y, angle, length) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(0, 100, 0);
  strokeWeight(3);
  line(0, 0, 0, -length);
  let numLeaves = int(length / 20);
  for (let i = 1; i <= numLeaves; i++) {
    let leafY = -i * 20;
    let leafSize = random(10, 20);
    drawLeaf(0, leafY, leafSize);
  }
  pop();
}

function drawLeaf(x, y, size) {
  push();
  translate(x, y);
  fill(0, 200, 0);
  noStroke();
  beginShape();
  for (let i = 0; i < TWO_PI; i += PI / 10) {
    let r = size + random(-2, 2);
    let lx = r * cos(i);
    let ly = r * sin(i);
    vertex(lx, ly);
  }
  endShape(CLOSE);
  pop();
}

function drawBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    push();
    fill(255, 100);
    ellipse(bubble.x, bubble.y, bubble.d);

    bubble.y -= bubble.bSpeed;
    if (bubble.y < -10) {
      bubble.y = height + 10;
    }
    pop();
  }
}
function resetTimer() {
  timer = maxTimer;
  timerStart = millis();
}

function updateTimer() {
  let elapsedTime = millis() - timerStart;
  timer = maxTimer - floor(elapsedTime / 1000);
  timer = constrain(timer, 0, maxTimer);
}

function displayTimer() {
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Lose In: " + timer, creatureX, creatureY - 90);
}

function displayFishCount() {
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Fish Count: " + fish.length, 10, 10);
}

function displayGameOver() {
  fill("red");
  textSize(48);
  textAlign(CENTER, CENTER);
  text("YOU DID GREAT", width / 2, height / 2);
}
