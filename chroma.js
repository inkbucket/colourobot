var chroma = require("chroma-js");

var color = chroma
  .cubehelix()
  .start(chroma(chroma.random()).get("hsl.h"))
  .rotations(-0.35)
  .gamma(0.5)
  .lightness([0.3, 0.8])
  .scale()
  .correctLightness()
  .colors(1)[0];

color = chroma(color);

const trimDecimals = function(num) {
  return num.toFixed(1);
};

var data = {
  hex: color.hex(),
  rgb: color.rgb().join(" , "),
  hsl: color
    .hsl()
    .map(a => trimDecimals(a))
    .join(" , "),
  classes: chroma
    .scale([color, chroma(color).set("hsl.l", "+20")])
    .mode("lch")
    .colors(6)
    .slice(0, -1),
  tones: [
    {
      name: "saturate",
      color: chroma(color)
        .saturate()
        .hex()
    },
    {
      name: "saturate2",
      color: chroma.blend(color, chroma(color).set("hsl.h", chroma(color).get("hsl.h") + 10), "overlay").hex()
    },
    {
      name: "brighten",
      color: chroma(color)
        .brighten()
        .hex()
    },
    {
      name: "lightness",
      color: chroma(color)
        .luminance(0.5)
        .hex()
    },
    {
      name: "darken",
      color: chroma(color)
        .darken()
        .hex()
    }
  ],
  name: chroma(color).name(),
  range: chroma
    .cubehelix()
    .start(chroma(color).get("hsl.h"))
    .rotations(-0.35)
    .gamma(0.9)
    .lightness([0.3, 0.8])
    .scale()
    .correctLightness()
    .colors(5),
  temperature: chroma(color).temperature(),
  contrast: chroma.contrast(color, "white")
};

exports.module = data;
