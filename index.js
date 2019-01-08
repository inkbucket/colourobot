const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");
const fs = require("fs");
const path = require("path");
var Twit = require("twit");
const config = require("./config");
const tpl = require("./template");

var T = new Twit(config);

function uploadImage(imagePath, hashTag) {
  var b64content = fs.readFileSync(imagePath, { encoding: "base64" });

  T.post("media/upload", { media_data: b64content }, function(err, data, response) {
    var mediaIdStr = data.media_id_string;
    var altText = new Date().toISOString();
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

    T.post("media/metadata/create", meta_params, function(err, data, response) {
      if (!err) {
        var params = {
          status: hashTag,
          media_ids: [mediaIdStr]
        };

        T.post("statuses/update", params, function(err, data, response) {
          // console.log(data);
        });
      }
    });
  });
}

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 250, height: 264, deviceScaleFactor: 1.3 });

  fs.writeFileSync(__dirname + "./tpl.html", await tpl());
  fs.writeFileSync(__dirname + "./tpl.html", await tpl());
  await page.setContent(await tpl());
  let hexEl = await page.$(".hex");
  let hexValue = await page.evaluate(element => element.textContent, hexEl);
  const screenshot = await page.screenshot({ path: "./example.png" });
  uploadImage("./example.png", hexValue);

  await browser.close();
  res.end("screenshot done");
  res.end(screenshot);
};
