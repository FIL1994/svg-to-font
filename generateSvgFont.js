const SVGIcons2SVGFontStream = require("svgicons2svgfont");
const fs = require("fs");

function generateSvgFont() {
  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontName: "hello"
    });

    // Setting the font destination
    fontStream
      .pipe(fs.createWriteStream("fonts/hello.svg"))
      .on("finish", function() {
        console.log("Font successfully created!");
        resolve();
      })
      .on("error", function(err) {
        console.log(err);
        reject(err);
      });

    // Writing glyphs
    const glyph1 = fs.createReadStream("icons/icon1.svg");
    glyph1.metadata = {
      unicode: ["\uE001\uE002"],
      name: "icon1"
    };
    fontStream.write(glyph1);
    // Multiple unicode values are possible
    const glyph2 = fs.createReadStream("icons/icon1.svg");
    glyph2.metadata = {
      unicode: ["\uE002", "\uEA02"],
      name: "icon2"
    };
    fontStream.write(glyph2);
    // Either ligatures are available
    const glyph3 = fs.createReadStream("icons/icon1.svg");
    glyph3.metadata = {
      unicode: ["\uE001\uE002"],
      name: "icon1-icon2"
    };
    fontStream.write(glyph3);

    // Do not forget to end the stream
    fontStream.end();
  });
}

module.exports = generateSvgFont;
