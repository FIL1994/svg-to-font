const generateSvgFont = require("./generateSvgFont");

async function run() {
  await generateSvgFont();

  const fs = require("fs");
  const svg2ttf = require("svg2ttf");

  if (!fs.existsSync("icons")) fs.mkdirSync("fonts");
  if (!fs.existsSync("fonts")) fs.mkdirSync("fonts");

  const ttf = svg2ttf(fs.readFileSync("fonts/hello.svg", "utf8"), {});
  fs.writeFileSync("fonts/myfont.ttf", Buffer.from(ttf.buffer));

  const base64Font = fs.readFileSync(`fonts/myfont.ttf`).toString("base64");
}

run();
