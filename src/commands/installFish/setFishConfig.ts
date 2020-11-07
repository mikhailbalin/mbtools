import path from 'path';
import os from 'os';
import { readAsync, writeAsync } from 'fs-jetpack';
import ejs from 'ejs';
import type { TContext } from '../../types';

const setFishConfig = async (fileName: string, config: TContext) => {
  const configPath = path.join(
    os.homedir(),
    '.config',
    'fish',
    fileName !== 'config' ? `functions/${fileName}.fish` : `${fileName}.fish`,
  );

  const teplateName = `${fileName}.fish.ejs`;

  const templatePath = path.join(
    __dirname,
    '..',
    '..',
    'templates',
    teplateName,
  );

  try {
    const template = await readAsync(templatePath);
    if (!template) throw new Error(`${teplateName} template is not found`);
    const content = await ejs.render(template, config, { async: true });
    await writeAsync(configPath, content);
  } catch (error) {
    throw new Error(error.message ?? `Error setting ${teplateName} template`);
  }
};

export default setFishConfig;
