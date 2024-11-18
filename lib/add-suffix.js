import { execaCommandSync } from 'execa';
import { replaceInFileSync } from 'replace-in-file';

import { packageJsonPath, version, name } from './import-package.js';
import { getSuffixAndRegex } from './get-suffix-and-regex.js';

export const addSuffix = providedSuffix => {
  const { suffix, suffixRegex } = getSuffixAndRegex(providedSuffix);

  const { stdout } = execaCommandSync(`npm view ${name} versions`);
  const allBetaVersions = JSON.parse(stdout.replace(/'/g, '"'))
    .filter(v => v.includes(`${version}${suffix}`))
    .map(v => +v.split(suffix)[1])
    .sort((a, b) => b - a);

  const latestBeta = allBetaVersions[0];
  const newBetaVersion = `${version}${suffix}${
    latestBeta ? latestBeta + 1 : 1
  }`;

  replaceInFileSync({
    files: packageJsonPath,
    from: new RegExp(`\"version\": \"(\d|\.|(${suffixRegex}))+\",`, 'g'),
    to: `"version": "${newBetaVersion}",`
  });
};