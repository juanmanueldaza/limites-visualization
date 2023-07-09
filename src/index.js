import p5 from "p5";
import * as Tone from "tone";
import { sketchIt } from "./sketch";

const meter = new Tone.Meter();
const player = new Tone.Player();
const analyser = new Tone.Analyser();

player.chain(analyser, meter, Tone.Destination);

new p5(sketch => sketchIt(sketch, analyser, player));
