import os from 'os';
import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import { TOptions } from './parseArgumentsIntoOptions';
import renderTemplate from './renderTemplate';

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

  const filePath = path.join(
    os.homedir(),
    '.config',
    'fish',
    fileName !== 'config' ? `functions/${fileName}.fish` : `${fileName}.fish`,
  );

  if (configContent) {
    await writeAsync(filePath, configContent);
  }
};

export default setFishConfig;
