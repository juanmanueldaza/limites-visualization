import { visualize } from "./visualization";

export function sketchIt(sketch, analyser, player) {
  let config = {
    font: null,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    backgroundColor: 0,
    textColor: 255,
    lineColor: 255,
    currentVisualizations: {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
    },
    noiseScale: 0.1,
    noiseStrength: 20,
    distortionAmount: 50,
    distortionSpeed: 0.02,
    spacing: 100,
    maxSize: 200,
  };
  let audioContextStarted = false;

  sketch.preload = () => {
    config.font = sketch.loadFont("/public/Roboto-Black.ttf");
  };

  sketch.setup = () => {
    sketch.createCanvas(config.windowWidth, config.windowHeight);
    sketch.frameRate(30);
    sketch.noFill();
    sketch.textFont(config.font);
    sketch.textSize(100);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);

    sketch.canvas.addEventListener("mousedown", startAudioContext);
    sketch.canvas.addEventListener("touchstart", startAudioContext, {
      passive: false,
    });
  };

  sketch.draw = () => {
    sketch.background(config.backgroundColor);

    const dataArray = analyser.getValue();

    for (const visualization in config.currentVisualizations) {
      if (config.currentVisualizations[visualization]) {
        visualize(Number(visualization), dataArray, sketch, config);
      }
    }

    sketch.loop();
  };

  sketch.windowResized = () => {
    config.windowWidth = window.innerWidth;
    config.windowHeight = window.innerHeight;
    sketch.resizeCanvas(config.windowWidth, config.windowHeight);
  };

  sketch.keyTyped = () => {
    if (sketch.key === "1") {
      config.currentVisualizations[1] = !config.currentVisualizations[1];
    } else if (sketch.key === "2") {
      config.currentVisualizations[2] = !config.currentVisualizations[2];
    } else if (sketch.key === "3") {
      config.currentVisualizations[3] = !config.currentVisualizations[3];
    } else if (sketch.key === "4") {
      config.currentVisualizations[4] = !config.currentVisualizations[4];
    } else if (sketch.key === "5") {
      config.currentVisualizations[5] = !config.currentVisualizations[5];
    } else if (sketch.key === "6") {
      config.currentVisualizations[6] = !config.currentVisualizations[6];
    } else if (sketch.key === "7") {
      config.currentVisualizations[7] = !config.currentVisualizations[7];
    }
  };

  function startAudioContext() {
    if (!audioContextStarted && player.loaded) {
      audioContextStarted = true;
      player
        .start()
        .then(() => {
          Tone.start();
          sketch.loop();
        })
        .catch(error => {
          console.error("Failed to start audio context:", error);
        });
    }
  }
}
