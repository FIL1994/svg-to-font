const SVGIcons2SVGFontStream = require("svgicons2svgfont");
const fs = require("fs");

function getUnicodeAndName(fileName) {
  if (fileName[0] === "u") {
    const [unicode, ...nameChunks] = fileName.substring(1).split("-");
    const name = nameChunks.join("-");

    return [unicode, name];
  }
  return [null, fileName];
}

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

    const icons = fs.readdirSync(dir).filter(i => i.endsWith(".svg"));
    let lastUnicode = icons
      .reverse()
      .map(i => getUnicodeAndName(i)[0])
      .find(u => u !== null);

    icons.reverse().forEach((file, index) => {
      let [unicode, name] = getUnicodeAndName(file);
      if (unicode === null) {
        unicode = (parseInt(lastUnicode, 16) + 1).toString(16);
        lastUnicode = unicode;
      }

      const glyph = fs.createReadStream(`${dir}/${file}`);
      glyph.metadata = {
        unicode: [String.fromCharCode(unicode, 16)],
        name
      };
      fontStream.write(glyph);
    });

    fontStream.end();
  });
}

module.exports = generateSvgFont;
