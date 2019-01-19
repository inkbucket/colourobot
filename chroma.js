var chroma = require("chroma-js");

var randomVal = parseFloat(Math.random().toFixed(2));

if (randomVal == 0) {
  randomVal = 0.45;
}

var colors = chroma
  .cubehelix()
  .start(chroma(chroma.random()).get("hsl.h"))
  .gamma(randomVal)
  .lightness([randomVal, randomVal])
  .scale()
  .colors(10);
var randomIndex = Math.round(Math.random() * 9);
var color = colors[randomIndex];

color = chroma(color);

var data = {
  hex: color.hex()
};

exports.module = data;
