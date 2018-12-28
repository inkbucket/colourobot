var fs = require("fs");
var Liquid = require("liquidjs");
var data = require("./chroma");

var engine = Liquid();
var compiled;
async function compile() {
  return await engine.renderFile("./index.html", { data: data.module });
}

module.exports = compile;
