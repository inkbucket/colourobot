var fs = require("fs");
var _ = require("lodash");
var data = require("./chroma");

var tpl = fs.readFileSync("./index.html", "utf8");

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var compiled = _.template(tpl)({ data: data.module });

console.log(compiled);

module.exports = compiled;
