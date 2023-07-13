import p5 from "p5";
import { sketchIt } from "./sketch";

const init = async () => {
  console.log("Starting Visualizer... Please wait!");

  const audioContext = new AudioContext();
  const mp3FilePath = "LIMITES1.mp3";

  try {
    const response = await fetch(mp3FilePath);
    console.log("response", response);
    const arrayBuffer = await response.arrayBuffer();
    console.log("arrayBuffer", arrayBuffer);
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    console.log("audioBuffer", audioBuffer);
    const sourceNode = audioContext.createBufferSource();

    const analyserNode = audioContext.createAnalyser();
    console.log("analyserNode", analyserNode);

    analyserNode.fftSize = 2048; // Set the FFT size for frequency analysis

    sourceNode.buffer = audioBuffer;
    console.log("sourceNode", sourceNode);
    sourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    new p5(sketch => sketchIt(sketch, analyserNode, sourceNode));
  } catch (error) {
    console.error("Failed to load MP3 file:", error);
  }
};

let button = document.querySelector("#init");

button.addEventListener("click", async () => {
  button.style.display = "none";
  await init();
});
