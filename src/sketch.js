import { audioContextStarted as started, config as theConfig } from "./config";
import { visualize } from "./visualization";

export const sketchIt = (sketch, analyserNode, sourceNode) => {
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
    const dataArray = new Uint8Array(analyserNode.fftSize);
    analyserNode.getByteTimeDomainData(dataArray);

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
    if (["1", "2", "3", "4"].includes(sketch.key)) {
      const key = Number(sketch.key);
      config.currentVisualizations[key] = !config.currentVisualizations[key];
      console.log("config.currentVisualizations", config.currentVisualizations);
    }
  };

  const startAudioContext = () => {
    if (!audioContextStarted && sourceNode.buffer) {
      audioContextStarted = true;
      sourceNode.start();
      sketch.loop();
    }
  };
};
