import compareImages from "resemblejs/compareImages.js";
import * as fs from 'fs/promises';
import path from "path";

async function discoverScenarios(dirs, b_base) {
  let items = [];
  const list = await fs.readdir(path.join(...dirs));
  for (const entry of list) {
    const new_dirs = [...dirs, entry];
    const location = path.join(...new_dirs);
    const x = await fs.stat(location);
    if (x.isDirectory()) {
      if (entry.startsWith('esc')) {
        const stepList = [];
        const images = await fs.readdir(path.join(...new_dirs));
        for (const image of images) {
          const image_location = path.join(...new_dirs, image);
          const z = await fs.stat(image_location);
          if (z.isFile() && image.endsWith('.png')) {
            const step_name = image.endsWith('_dummy.png') ? image.slice(0, -10) :  image.slice(0, -4);

            let image_b_path = path.join(b_base, ...new_dirs.slice(1), step_name + '.png');
            let check_b = await fs.access(image_b_path, fs.constants.F_OK).then(() => true).catch(() => false);
            if(!check_b) {
              image_b_path = path.join(b_base, ...new_dirs.slice(1), step_name + '_dummy.png');
              check_b = await fs.access(image_b_path, fs.constants.F_OK).then(() => true).catch(() => false);
            }

            if(!check_b) {
              console.log('ERROR - Steps in a and b are different');
              console.log('  Group: ' + new_dirs[new_dirs.length-2]);
              console.log('  Scenario: ' + new_dirs[new_dirs.length-1]);
              console.log('  Step: ' + step_name);
              process.exit(1);
            }

            const step = {
              name: step_name,
              image_a: image_location,
              image_b: image_b_path
            }
            stepList.push(step);
          }
        }

        const item = {
          group: new_dirs[new_dirs.length-2],
          scenario: new_dirs[new_dirs.length-1],
          steps: stepList
        }
        items.push(item);
        continue;
      } else {
        items.push(...await discoverScenarios(new_dirs, b_base));
      }
    }
  }

  return items;
}

async function main() {
  console.log('Hola a VRT con ResembleJS');
  console.log('');

  const config = JSON.parse(await fs.readFile('./config.json'));

  const scenarios = await discoverScenarios(['ghost3'], 'ghost4');
  const num_scenarios = scenarios.length;

  let num_steps = 0;
  const groups = {}
  for (const esc of scenarios) {
    if (groups[esc.group] === undefined) {
      groups[esc.group] = [esc];
    }
    else {
      groups[esc.group].push(esc);
    }

    num_steps += esc.steps.length;
  }
  const num_groups = Object.keys(groups).length;

  console.log('Encontré ' + num_scenarios + ' escenarios en ' +  num_groups + ' grupos con ' + num_steps + ' pasos');
  console.log('')

  for (const [key, value] of Object.entries(groups)) {
    console.log('Grupo ' + key);
    for (const esc of value) {
      console.log('  ' + esc.scenario);
      for (const step of esc.steps) {
        console.log('    ' + step.name);

        /*var data = await compareImages(
          'ghost3/create-tag.cy.js/create-tag/esc07/00_SignIn_open.png',
          'ghost4/create-tag.cy.js/create-tag/esc07/00_SignIn_open.png',
          config.resembleJS
        );
        await fs.writeFile("./diff.png", data.getBuffer());*/
      }
    }
  }
}

await main();
