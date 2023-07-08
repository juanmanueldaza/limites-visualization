import p5 from "p5";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let backgroundColor = 0;
let lineColor = 255;

new p5(sketch => {
  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    sketch.frameRate(30);
    sketch.noFill();
  };

  sketch.draw = () => {
    sketch.background(backgroundColor);

    // Generate and draw moving lines
    for (let i = 0; i < windowHeight; i += 10) {
      let x1 = 0;
      let y1 = i + sketch.random(-5, 5);
      let x2 = windowWidth;
      let y2 = i + sketch.random(-5, 5);

      sketch.stroke(lineColor);
      sketch.line(x1, y1, x2, y2);
    }

    // Add flickering effect
    if (sketch.random() > 0.9) {
      lineColor = sketch.random(255);
    }
  };

  sketch.windowResized = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    sketch.resizeCanvas(windowWidth, windowHeight);
  };
});
