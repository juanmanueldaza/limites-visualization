import { audioContextStarted as started, config as theConfig } from "./config";
import { visualize } from "./visualization";

export const sketchIt = (sketch, analyser, player) => {
  let audioContextStarted = started();
  let config = theConfig();
  sketch.setup = () => {
    sketch.createCanvas(config.windowWidth, config.windowHeight);
    sketch.frameRate(30);
    sketch.noFill();
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
    config.centerX = config.windowWidth / 2;
    config.centerY = config.windowHeight / 2;
    config.diagonalLength = Math.sqrt(
      Math.pow(config.windowWidth, 2) + Math.pow(config.windowHeight, 2)
    );
    sketch.resizeCanvas(config.windowWidth, config.windowHeight);
  };

  sketch.keyTyped = () => {
    if (["1", "2", "3", "4"].includes(sketch.key)) {
      const key = Number(sketch.key);
      config.currentVisualizations[key] = !config.currentVisualizations[key];
      console.log(config.currentVisualizations);
    }
  };

  const startAudioContext = () => {
    if (!audioContextStarted && player.loaded) {
      audioContextStarted = true;
      player.start();
      sketch.loop();
    }
  };
};
