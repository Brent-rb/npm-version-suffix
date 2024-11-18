import { replaceInFileSync } from 'replace-in-file';

import { packageJsonPath, version, name } from './import-package.js';
import { getSuffixAndRegex } from './get-suffix-and-regex.js';

export const removeSuffix = providedSuffix => {
  const { suffix, suffixRegex } = getSuffixAndRegex(providedSuffix);
  const releaseVersion = version.split(suffix)[0];

  replaceInFileSync({
    files: packageJsonPath,
    from: new RegExp(`\"version\": \"(\d|\.|(${suffixRegex}))+\",`, 'g'),
    to: `"version": "${releaseVersion}",`
  });
};