const puppeteer = require("puppeteer");
const fs = require("fs");
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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 250, height: 264, deviceScaleFactor: 1.3 });

  fs.writeFileSync("./tpl.html", await tpl());
  await page.setContent(await tpl());
  let hexEl = await page.$(".hex");
  let hexValue = await page.evaluate(element => element.textContent, hexEl);
  await page.screenshot({ path: "example.png" });
  uploadImage("./example.png", hexValue);

  await browser.close();
})();
