import p5 from "p5";
import { Analyser, Destination, Meter, Player } from "tone";
import { sketchIt } from "./sketch";

const meter = new Meter();
const player = new Player();
const analyser = new Analyser();

const mp3FilePath = "LIMITES1.mp3";
player.load(mp3FilePath, null, error => {
  console.error("Failed to load MP3 file:", error);
});

player.chain(analyser, meter, Destination);

new p5(sketch => sketchIt(sketch, analyser, player));
