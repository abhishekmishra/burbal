/**
 *  Balloon class
 * A class to define how a balloon should look and behave
 * Balloons are randomly placed on the canvas
 * and have a random size and color
 *
 * They have a display() method to draw them
 *
 * The balloons move upwards as soon as they are created
 * Some move slowly some move fast.
 */
class Balloon {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(50, 100);
    this.color = [random(255), random(255), random(255)];
    this.inCanvas = true;

    // Random speed
    this.speedY = random(10, 200);
    this.speedX = random(-0.5, 0.5);
  }

  update(deltaTime) {
    this.y -= (this.speedY * deltaTime) / 1000;
    this.x += (this.speedX * deltaTime) / 1000;

    // If the balloon goes out of the canvas
    // mark it as out of the canvas
    if (this.y < 0) {
      this.inCanvas = false;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
