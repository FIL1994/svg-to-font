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

  const ttf = svg2ttf(fs.readFileSync(`${dir}/font.svg`, "utf8"), {});
  if (writeFile) fs.writeFileSync("fonts/myfont.ttf", Buffer.from(ttf.buffer));
  return Buffer.from(ttf.buffer);
}

// async function run() {
//   const font = await createFont("fonts", "myfont");

//   const base64Font = font.toString("base64");
//   console.log(base64Font.length);
// }

// run();

module.exports = createFont;
