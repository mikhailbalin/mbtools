import os from 'os';
import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import type { TOptions } from '../types';
import renderTemplate from './renderTemplate';

export const getConfigPath = (fileName: string) =>
  path.join(
    os.homedir(),
    '.config',
    'fish',
    fileName !== 'config' ? `functions/${fileName}.fish` : `${fileName}.fish`,
  );

const setFishConfig = async (
  fileName: string,
  options: Omit<TOptions, 'skipPrompts'>,
) => {
  const templatePath = path.join(
    __dirname,
    `../templates/${fileName}.fish.ejs`,
  );

  const configTemplate = await readAsync(templatePath);
  const configContent = await renderTemplate(configTemplate, {
    ...options,
    display: false,
    yarn: false,
  });

  if (configContent) {
    await writeAsync(getConfigPath(fileName), configContent);
  }
};

export default setFishConfig;
