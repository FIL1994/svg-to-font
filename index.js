const generateSvgFont = require("./generateSvgFont");

async function run() {
  await generateSvgFont();

  const fs = require("fs");
  const svg2ttf = require("svg2ttf");

  const ttf = svg2ttf(fs.readFileSync("fonts/hello.svg", "utf8"), {});
  fs.writeFileSync("fonts/myfont.ttf", new Buffer(ttf.buffer));
}

run();
