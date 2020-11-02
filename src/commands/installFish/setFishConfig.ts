import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import type { TContext } from '../../types';
import { renderTemplate } from '../../utils';
import { getConfigPath } from './getConfigPath';

const setFishConfig = async (fileName: string, config: TContext) => {
  const templatePath = path.join(
    __dirname,
    `..`,
    `templates`,
    `${fileName}.fish.ejs`,
  );

  const template = await readAsync(templatePath);
  const content = await renderTemplate(template, config);

  if (content) {
    await writeAsync(getConfigPath(fileName), content);
  }
};

export default setFishConfig;
