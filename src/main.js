import p5 from "p5";
import * as Tone from "tone";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let backgroundColor = 0;
let textColor = 255;
let lineColor = 255;

let currentVisualizations = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
};

const noiseScale = 0.1; // Adjust the noise scale for line movement
const noiseStrength = 20;
const distortionAmount = 50; // Adjust the amount of distortion
const distortionSpeed = 0.02; // Adjust the speed of distortion

let spacing = 100;
const maxSize = 200;

const meter = new Tone.Meter();
const player = new Tone.Player();
const analyser = new Tone.Analyser();

player.chain(analyser, meter, Tone.Destination);

let audioContextStarted = false;

new p5(sketch => {
  let font;

  sketch.preload = () => {
    font = sketch.loadFont("/public/Roboto-Black.ttf"); // Load Arial font
  };

  sketch.setup = () => {
    sketch.createCanvas(windowWidth, windowHeight);
    sketch.frameRate(30);
    sketch.noFill();
    sketch.textFont(font);
    sketch.textSize(100);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);

    sketch.canvas.addEventListener("mousedown", startAudioContext);
    sketch.canvas.addEventListener("touchstart", startAudioContext, {
      passive: false,
    });

    const mp3FilePath = "LIMITES1.mp3";
    player.load(
      mp3FilePath,
      () => {
        console.log("MP3 file loaded successfully");
      },
      error => {
        console.error("Failed to load MP3 file:", error);
      }
    );
  };

  sketch.draw = () => {
    sketch.background(backgroundColor);

    const dataArray = analyser.getValue();

    // Use dataArray for visualization or analysis based on currentVisualizations
    for (const visualization in currentVisualizations) {
      if (currentVisualizations[visualization]) {
        visualize(Number(visualization), dataArray, sketch);
      }
    }

    sketch.loop();
  };

  sketch.windowResized = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    sketch.resizeCanvas(windowWidth, windowHeight);
  };

  sketch.keyTyped = () => {
    // Toggle visualization based on keyboard number buttons 1 to 7
    if (sketch.key === "1") {
      currentVisualizations[1] = !currentVisualizations[1];
    } else if (sketch.key === "2") {
      currentVisualizations[2] = !currentVisualizations[2];
    } else if (sketch.key === "3") {
      currentVisualizations[3] = !currentVisualizations[3];
    } else if (sketch.key === "4") {
      currentVisualizations[4] = !currentVisualizations[4];
    } else if (sketch.key === "5") {
      currentVisualizations[5] = !currentVisualizations[5];
    } else if (sketch.key === "6") {
      currentVisualizations[6] = !currentVisualizations[6];
    } else if (sketch.key === "7") {
      currentVisualizations[7] = !currentVisualizations[7];
    }
  };

  function startAudioContext() {
    if (!audioContextStarted && player.loaded) {
      audioContextStarted = true;
      Tone.start();
      player.start();
      sketch.draw();
    }
  }
});

// Function to visualize the audio based on the current visualization mode
function visualize(visualizationMode, dataArray, sketch) {
  // Additional visualizations and variations based on the visualization mode
  switch (visualizationMode) {
    case 1:
      // First visualization - TV signal effect
      // Adjust the noise strength for line vibration
      for (let i = 0; i < windowHeight; i += 10) {
        const noiseValue = sketch.noise(
          i * noiseScale,
          sketch.frameCount * 0.02
        );
        const offsetY = noiseValue * noiseStrength * dataArray[i / 10];

        let x1 = 0;
        let y1 = i + offsetY;
        let x2 = windowWidth;
        let y2 = i + offsetY;

        sketch.stroke(lineColor);
        sketch.line(x1, y1, x2, y2);
      }

      if (sketch.random() > 0.9) {
        lineColor = sketch.random(255);
      }

      break;
    case 2:
      // Second visualization - TV signal effect with vertical lines
      for (let i = 0; i < windowWidth; i += 10) {
        const noiseValue = sketch.noise(
          i * noiseScale,
          sketch.frameCount * 0.02
        );
        const offsetX = noiseValue * noiseStrength * dataArray[i / 10];

        let x1 = i + offsetX;
        let y1 = windowHeight;
        let x2 = i + offsetX;
        let y2 = windowHeight;

        sketch.stroke(lineColor);
        sketch.line(x1, y1, x2, y2);
      }

      if (sketch.random() > 0.9) {
        lineColor = sketch.random(255);
      }

      break;
    case 3:
      // Third visualization
      // Add your custom code here
      for (let x = 0; x < windowWidth; x += 10) {
        for (let y = 0; y < windowHeight; y += 10) {
          const noiseValueX = sketch.noise(
            x * noiseScale,
            sketch.frameCount * 0.02
          );
          const noiseValueY = sketch.noise(
            y * noiseScale,
            sketch.frameCount * 0.02
          );
          const offsetX = noiseValueX * noiseStrength * dataArray[x / 10];
          const offsetY = noiseValueY * noiseStrength * dataArray[y / 10];

          let x1 = x + offsetX;
          let y1 = y + offsetY;
          let x2 = x + offsetX + 10;
          let y2 = y + offsetY + 10;

          sketch.stroke(lineColor);
          sketch.line(x1, y1, x2, y2);
        }
      }

      if (sketch.random() > 0.9) {
        lineColor = sketch.random(255);
      }

      break;
    case 4:
      // Fourth visualization
      // Add your custom code here
      for (let x = 0; x < windowWidth; x += 10) {
        for (let y = 0; y < windowHeight; y += 10) {
          const distortionOffset =
            sketch.sin(x * distortionSpeed + sketch.frameCount * 0.1) *
            distortionAmount;
          const offsetX = distortionOffset * dataArray[x / 10];
          const offsetY = distortionOffset * dataArray[y / 10];

          let x1 = x + offsetX;
          let y1 = y + offsetY;
          let x2 = x + 10 + offsetX;
          let y2 = y + 10 + offsetY;

          sketch.stroke(lineColor);
          sketch.line(x1, y1, x2, y2);
        }
      }

      if (sketch.random() > 0.9) {
        lineColor = sketch.random(255);
      }

      break;
    case 5:
      // Fifth visualization
      // Add your custom code here
      for (let x = 0; x < windowWidth; x += 10) {
        for (let y = 0; y < windowHeight; y += 10) {
          const noiseValueX = sketch.noise(
            x * noiseScale,
            sketch.frameCount * 0.02
          );
          const noiseValueY = sketch.noise(
            y * noiseScale,
            sketch.frameCount * 0.02
          );
          const offsetX = noiseValueX * noiseStrength * dataArray[x / 10];
          const offsetY = noiseValueY * noiseStrength * dataArray[y / 10];

          const distortionOffset =
            sketch.sin(x * distortionSpeed + sketch.frameCount * 0.1) *
            distortionAmount;
          const distortionX = distortionOffset * dataArray[x / 10];
          const distortionY = distortionOffset * dataArray[y / 10];

          let x1 = x + offsetX + distortionX;
          let y1 = y + offsetY + distortionY;
          let x2 = x + 10 + offsetX + distortionX;
          let y2 = y + 10 + offsetY + distortionY;

          sketch.stroke(lineColor);
          sketch.line(x1, y1, x2, y2);
        }
      }

      if (sketch.random() > 0.9) {
        lineColor = sketch.random(255);
      }

      break;
    case 6:
      // Sixth visualization - Word "visuales" reacting to music
      const word = "visuales";

      for (let i = 0; i < word.length; i++) {
        const x = sketch.width / 2 + (i - (word.length - 1) / 2) * spacing;
        const y = sketch.height / 2;
        const size = sketch.map(dataArray[i], -100, 0, 0, maxSize);

        sketch.fill(textColor);
        sketch.textSize(size);
        sketch.text(word[i], x, y);
      }

      break;
    case 7:
      // Seventh visualization - Syllables of "visuales" reacting to music
      const syllables = ["vi", "sua", "les"];
      spacing = [100, 200, 150]; // Adjust spacing for each syllable

      for (let i = 0; i < syllables.length; i++) {
        const syllable = syllables[i];
        const x =
          sketch.width / 2 + (i - (syllables.length - 1) / 2) * spacing[i];
        const y = sketch.height / 2;
        const size = sketch.map(dataArray[i], -100, 0, 0, maxSize);

        sketch.fill(textColor);
        sketch.textSize(size);
        sketch.text(syllable, x, y);
      }

      break;
    default:
      break;
  }
}
