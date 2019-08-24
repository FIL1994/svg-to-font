const generateSvgFont = require("./generateSvgFont");

async function run() {
  await generateSvgFont();

  const fs = require("fs");
  const svg2ttf = require("svg2ttf");

  const ttf = svg2ttf(fs.readFileSync("fonts/hello.svg", "utf8"), {});
  fs.writeFileSync("fonts/myfont.ttf", Buffer.from(ttf.buffer));

  const base64Font = fs.readFileSync(`fonts/myfont.ttf`).toString("base64");

  console.log(base64Font);
  console.log(base64Font.length);
}

run();
