import compareImages from "resemblejs/compareImages.js";
import * as fs from 'fs/promises';

async function main() {
  console.log("Hola ResembleJS");

  const config = JSON.parse(await fs.readFile('./config.json'));

  var data = await compareImages(
    'ghost3/create-tag.cy.js/create-tag/esc07/00_SignIn_open.png',
    'ghost4/create-tag.cy.js/create-tag/esc07/00_SignIn_open.png',
    config.resembleJS
  );
  await fs.writeFile("./diff.png", data.getBuffer());
}

await main();
