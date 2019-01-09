var fs = require("fs");
var Liquid = require("liquidjs");
var chroma = require("chroma-js");

var engine = Liquid({
  dynamicPartials: true
});
async function compile() {
  var data = {};
  data.hex = chroma(
    chroma
      .cubehelix()
      .start(chroma(chroma.random()).get("hsl.h"))
      .gamma(0.9)
      .lightness([0.1, 0.9])
      .scale()
      .colors(1)[0]
  ).hex();
  data.cssPath = __dirname + "/style.css";
  return await engine.renderFile(__dirname + "/skeleton.html", { data });
}

module.exports = compile;
