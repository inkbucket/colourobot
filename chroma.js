var chroma = require("chroma-js");

var color = chroma.random();

var data = {
  color: color.hex(),
  lch: chroma
    .scale([color, chroma(color).set("hsl.l", "+20")])
    .mode("lch")
    .colors(6),
  saturate: chroma(color)
    .saturate()
    .hex(),
  saturate2: chroma(color)
    .saturate(3)
    .hex(),
  brighten: chroma(color)
    .brighten()
    .hex(),
  name: chroma(color).name(),
  lightness: chroma(color)
    .luminance(0.5)
    .hex()
};

exports.module = data;
