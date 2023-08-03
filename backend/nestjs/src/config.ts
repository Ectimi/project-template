import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { isProduction } from './utils';
import { join } from 'path';

export default async () => {
  const configFilePath = isProduction
    ? join(__dirname, `./prod.config.yaml`)
    : `src/dev.config.yaml`;
  const config = await readFile(configFilePath);

  return yaml.load(config);
};
