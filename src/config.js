export let config = () => {
  return {
    font: null,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    backgroundColor: 0,
    lineColor: 255,
    currentVisualizations: Object.fromEntries(
      Array.from({ length: 7 }, (_, i) => [i + 1, false])
    ),
    noiseScale: 0.1,
    noiseStrength: 20,
    distortionAmount: 100,
    distortionSpeed: 0.08,
    spacing: 100,
    maxSize: 200,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    scaleFactor: 20,
    diagonalLength: Math.sqrt(
      Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
    ),
  };
};

export let audioContextStarted = () => false;
