import p5 from "p5";
import * as Tone from "tone";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let backgroundColor = 0;
let lineColor = 255;

const meter = new Tone.Meter();
const mic = new Tone.UserMedia().connect(meter);

let audioContextStarted = false; // Track if the audio context has been started

new p5(sketch => {
  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    sketch.frameRate(30);
    sketch.noFill();

    // Add event listener for user gesture
    sketch.canvas.addEventListener("mousedown", startAudioContext);
    sketch.canvas.addEventListener("touchstart", startAudioContext);
  };

  sketch.draw = () => {
    sketch.background(backgroundColor);

    // Analyze the microphone input
    const level = meter.getValue();

    // Generate and draw moving lines
    for (let i = 0; i < windowHeight; i += 10) {
      let x1 = 0;
      let y1 = i + sketch.random(-5, 5) * level;
      let x2 = windowWidth;
      let y2 = i + sketch.random(-5, 5) * level;

      sketch.stroke(lineColor);
      sketch.line(x1, y1, x2, y2);
    }

    // Add flickering effect based on the input level
    if (sketch.random() > 0.9) {
      lineColor = sketch.random(255);
    }

    // Call draw() continuously for animation
    sketch.loop();
  };

  sketch.windowResized = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    sketch.resizeCanvas(windowWidth, windowHeight);
  };

  // Function to start the audio context
  function startAudioContext() {
    if (!audioContextStarted) {
      audioContextStarted = true;
      mic
        .open()
        .then(() => {
          Tone.start();
          sketch.draw();
        })
        .catch(err => {
          console.error("Failed to open microphone:", err);
        });
    }
  }
});
