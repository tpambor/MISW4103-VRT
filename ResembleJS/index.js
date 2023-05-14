import compareImages from "resemblejs/compareImages.js";
import * as fs from 'fs/promises';
import path from "path";
import ejs from "ejs";

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
            let check_b = await fs.access(image_b_path).then(() => true).catch(() => false);
            if(!check_b) {
              image_b_path = path.join(b_base, ...new_dirs.slice(1), step_name + '_dummy.png');
              check_b = await fs.access(image_b_path).then(() => true).catch(() => false);
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

const reportData = {
  date: new Date().toLocaleString(),
  scenarios: [],
  numFailed: 0,
};

async function main() {
  console.log('Hola a VRT con ResembleJS');
  console.log('');

  const config = JSON.parse(await fs.readFile('./config.json'));

  const scenarios = await discoverScenarios(['ghost3'], 'ghost4');
  const num_scenarios = scenarios.length;
  
  let num_steps = 0;
  const groups = {}
  let datetime = new Date().toISOString().replace(/:/g, ".");

  for (const esc of scenarios) {
    if (groups[esc.group] === undefined) {
      groups[esc.group] = [esc];
    }
    else {
      groups[esc.group].push(esc);
    }

   
  }
  
  const num_groups = Object.keys(groups).length;

  console.log('Encontré ' + num_scenarios + ' escenarios en ' +  num_groups + ' grupos con ' + num_steps + ' pasos');
  console.log('')

  const reportData = {
    date: new Date().toLocaleString(),
    scenarios: [],
    numFailed: 0,
  };
  
  for (const [key, value] of Object.entries(groups)) {
    console.log('Grupo ' + key);
    for (const esc of value) {
      console.log('  ' + esc.scenario);

      await fs.mkdir(path.join('results', 'comp', key, esc.scenario), { recursive: true })
      await fs.mkdir(path.join('results', 'before', key, esc.scenario), { recursive: true })
      await fs.mkdir(path.join('results', 'after', key, esc.scenario), { recursive: true })

      const scenario = {
        name: esc.scenario,
        status: 'PASSED',
        steps: [],
        group: key
      };
     
      for (const step of esc.steps) {
        console.log('    ' + step.name);
       
        const data = await compareImages(
          step.image_a,
          step.image_b,
          config.resembleJS
        );
  
        const resultPath = path.join('comp', key, esc.scenario, step.name + '.png');
        await fs.writeFile(path.join('results', resultPath), data.getBuffer());
  
        const image_a_target = path.join('before', key, esc.scenario, step.name + '.png');
        await fs.copyFile(step.image_a, path.join('results', image_a_target));

        const image_b_target = path.join('after', key, esc.scenario, step.name + '.png');
        await fs.copyFile(step.image_b, path.join('results', image_b_target));

        const misMatchPercentage = data.misMatchPercentage;
        const passed = misMatchPercentage <= config.resembleJS.errorColor;

       
        if (!passed) {
          scenario.status = 'FAILED';
          reportData.numFailed++;
        }
  
        const stepData = {
          name: step.name,
          passed,
          misMatchPercentage,
          resultPath: resultPath,
          before: image_a_target, 
          after: image_b_target,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          data: JSON.stringify(
            {
              isSameDimensions: data.isSameDimensions,
              dimensionDifference: data.dimensionDifference,
              rawMisMatchPercentage: data.rawMisMatchPercentage,
              misMatchPercentage: data.misMatchPercentage,
              diffBounds: data.diffBounds,
              analysisTime: data.analysisTime,
            },
            null,
            2
          ),
        };
        
        scenario.steps.push(stepData);
      }
  
      reportData.scenarios.push(scenario);
    }
  }
  
  const reportPath = path.join('results', 'report.html');
  const reportTemplate = await fs.readFile('./report-template.ejs', 'utf8');
  const html = ejs.render(reportTemplate, { reportData });
  await fs.writeFile(reportPath, html);
  console.log('Reporte generado en ' + reportPath);
  
}
await main();

