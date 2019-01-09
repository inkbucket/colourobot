const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");
const fs = require("fs");
const path = require("path");
var Twit = require("twit");
const config = require("./config");
const tpl = require("./template");

var T = new Twit(config);

function uploadImage(imagePath, hashTag, res) {
  var b64content = fs.readFileSync(imagePath, { encoding: "base64" });
  console.log("uploadImage: start");

  T.post("media/upload", { media_data: b64content }, function(err, data, response) {
    var mediaIdStr = data.media_id_string;
    var altText = new Date().toISOString();
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
    console.log("uploadImage: create");

    T.post("media/metadata/create", meta_params, function(err, data, response) {
      if (!err) {
        var params = {
          status: hashTag,
          media_ids: [mediaIdStr]
        };
        console.log("uploadImage: upload");

        T.post("statuses/update", params, function(err, data, response) {
          if (err) {
            console.log("Error", err);
            return;
          }
          console.log("uploadImage: done");
          res.end("screenshot done");
        });
      }
    });
  });
}

module.exports = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 250, height: 264, deviceScaleFactor: 1.3 });

    await page.setContent(await tpl(), {
      timeout: 0,
      waitUntil: "networkidle0"
    });
    let hexEl = await page.$(".hex");
    let hexValue = await page.evaluate(element => element.textContent, hexEl);
    await page.screenshot({ path: "/tmp/example.png" });
    uploadImage("/tmp/example.png", hexValue, res);

    await browser.close();
  } catch (e) {
    console.log(e);
    res.end("Got Error!");
  }
};
