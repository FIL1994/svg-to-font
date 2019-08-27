const createFont = require("./index.js");

async function create() {
  console.log((await createFont("fonts", "fontaname", true)).length);
}

create();
