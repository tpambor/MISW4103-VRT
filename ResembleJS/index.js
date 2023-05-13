import compareImages from "resemblejs/compareImages.js";
import * as fs from 'fs/promises';

console.log("Hola ResembleJS");

async function main() {
  var data = await compareImages(
    'ghost3/create-tag.cy.js/create-tag/esc07/00_SignIn_open.png',
    'ghost4/create-tag.cy.js/create-tag/esc07/00_SignIn_open.png'
  );
  await fs.writeFile("./diff.png", data.getBuffer());
}

await main();
