const SVGIcons2SVGFontStream = require("svgicons2svgfont");
const fs = require("fs");

function generateSvgFont() {
  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontName: "hello"
    });

    fontStream
      .pipe(fs.createWriteStream("fonts/hello.svg"))
      .on("finish", function() {
        console.log("Font successfully created!");
        resolve();
      })
      .on("error", function(err) {
        reject(err);
      });

    fs.readdirSync(`${__dirname}/icons`)
      .filter(i => i.endsWith(".svg"))
      .forEach((file, index) => {
        const glyph = fs.createReadStream(`${__dirname}/icons/${file}`);
        glyph.metadata = {
          unicode: [String.fromCharCode(parseInt("EA01", 16) + index)], // ["\uE002", "\uEA02"],
          name: file
        };
        fontStream.write(glyph);
      });

    fontStream.end();
  });
}

module.exports = generateSvgFont;
