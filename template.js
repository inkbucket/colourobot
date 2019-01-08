var fs = require("fs");
var Liquid = require("liquidjs");
var data = require("./chroma");

var engine = Liquid({
  dynamicPartials: true
  // root: __dirname
});
var compiled;
async function compile() {
  data.module.cssPath = __dirname + "/style.css";
  console.log("data.module", data.module);
  return await engine.renderFile(__dirname + "/skeleton.html", { data: data.module });
}

module.exports = compile;
