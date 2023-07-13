export const visualize = (visualizationMode, dataArray, sketch, config) => {
  const {
    windowHeight,
    windowWidth,
    scaleFactor,
    noiseScale,
    noiseStrength,
    centerY,
    centerX,
    diagonalLength,
  } = config;

  console.log(
    "from Visualizations",
    visualizationMode,
    dataArray,
    sketch,
    config
  );

  const frameCountScaled = sketch.frameCount * 0.02;

  for (let i = 0; i < windowWidth / scaleFactor; i++) {
    const noiseValue = sketch.noise(i * noiseScale, frameCountScaled);
    const dataValue = dataArray[Math.floor(i / scaleFactor)];
    const offset = noiseValue * noiseStrength;

    let x1, y1, x2, y2;

    const lineColor = dataValue > 0 ? sketch.color(0) : sketch.color(255);

    switch (visualizationMode) {
      case 1:
        y1 =
          i * scaleFactor +
          offset * dataValue +
          centerX / scaleFactor +
          centerY / scaleFactor -
          diagonalLength / scaleFactor;
        sketch.stroke(lineColor);
        sketch.line(0, y1, windowWidth, y1);
        break;
      case 2:
        x1 = i * scaleFactor + offset * dataValue + centerX;
        sketch.stroke(lineColor);
        break;
      case 3:
        x1 = windowWidth - i * scaleFactor + offset * dataValue + centerX;
        y1 = i * scaleFactor + offset * dataValue + centerY;
        x2 = x1 - diagonalLength;
        y2 = y1 + diagonalLength;
        sketch.stroke(lineColor);
        sketch.line(x1, y1, x2, y2);
        break;
      case 4:
        x1 =
          (i - diagonalLength / scaleFactor) * scaleFactor +
          offset * dataValue +
          centerX;
        y1 =
          (-diagonalLength + i + diagonalLength / scaleFactor) * scaleFactor +
          offset * dataValue +
          centerY;
        x2 = x1 + windowWidth;
        y2 = y1 + windowHeight;
        sketch.stroke(lineColor);
        sketch.line(x1, y1, x2, y2);
        break;
      default:
        break;
    }
  }
};
