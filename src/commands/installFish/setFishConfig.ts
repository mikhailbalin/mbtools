import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import ejs from 'ejs';
import type { TContext } from '../../types';
import { getConfigPath } from './getConfigPath';

const setFishConfig = async (fileName: string, config: TContext) => {
  const teplateName = `${fileName}.fish.ejs`;
  const templatePath = path.join(
    __dirname,
    '..',
    '..',
    `templates`,
    teplateName,
  );

  try {
    const template = await readAsync(templatePath);
    if (!template) throw new Error(`${teplateName} template is not found`);
    const content = await ejs.render(template, config, { async: true });
    await writeAsync(getConfigPath(fileName), content);
  } catch {
    throw new Error(`Error setting ${teplateName} template`);
  }
};

export default setFishConfig;
