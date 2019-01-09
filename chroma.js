var chroma = require("chroma-js");

var color = chroma
  .cubehelix()
  .start(chroma(chroma.random()).get("hsl.h"))
  .gamma(0.9)
  .lightness([0.1, 0.9])
  .scale()
  .colors(1)[0];

color = chroma(color);

var data = {
  hex: color.hex()
};

exports.module = data;
