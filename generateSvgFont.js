const SVGIcons2SVGFontStream = require("svgicons2svgfont");
const fs = require("fs");

function generateSvgFont(dir = "fonts", fontName = "myfont") {
  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontName,
      normalize: true,
      fontHeight: 1001
    });

    fontStream
      .pipe(fs.createWriteStream(`font.svg`))
      .on("finish", () => resolve())
      .on("error", err => reject(err));

    fs.readdirSync(dir)
      .filter(i => i.endsWith(".svg"))
      .forEach((file, index) => {
        const glyph = fs.createReadStream(`${dir}/${file}`);
        glyph.metadata = {
          unicode: [String.fromCharCode(parseInt("EA01", 16) + index)],
          name: file
        };
        fontStream.write(glyph);
      });

    fontStream.end();
  });
}

module.exports = generateSvgFont;
