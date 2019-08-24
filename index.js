const fs = require("fs");
const generateSvgFont = require("./generateSvgFont");

async function createFont(
  dir = "fonts",
  fontName = "myfont",
  writeFile = false
) {
  await generateSvgFont(dir, fontName);

  const svg2ttf = require("svg2ttf");

  if (!fs.existsSync("icons")) fs.mkdirSync("icons");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const ttf = svg2ttf(fs.readFileSync(`font.svg`, "utf8"), {});
  fs.unlink("fonts.svg", () => {});

  if (writeFile) fs.writeFileSync("myfont.ttf", Buffer.from(ttf.buffer));
  return Buffer.from(ttf.buffer);
}

module.exports = createFont;
