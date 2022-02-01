/* eslint-disable no-console */
const fs = require('fs');
const { join } = require('path');

const [, , path, threshold] = process.argv;

const covPath = './coverage/coverage-summary.json';

process.chdir(path);

if (!fs.existsSync(join(process.cwd(), covPath))) {
  throw new Error(`Code coverage folder ${covPath} does not exists`);
}

const out = JSON.parse(fs.readFileSync(join(process.cwd(), covPath)));

const covResults = Object.entries(out.total);

if (
  covResults.map(([, value]) => value.pct).some((e) => e < (threshold ?? 50))
) {
  console.log(covResults);
  throw new Error(`Code coverage must be over ${threshold} to pass in ${path}`);
}
