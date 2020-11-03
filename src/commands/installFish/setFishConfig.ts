import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import type { TContext } from '../../types';
import { renderTemplate } from '../../utils';
import { getConfigPath } from './getConfigPath';

const setFishConfig = async (fileName: string, config: TContext) => {
  const teplateName = `${fileName}.fish.ejs`;
  const templatePath = path.join(__dirname, `..`, `templates`, teplateName);

  try {
    const template = await readAsync(templatePath);
    const content = await renderTemplate(template, config);

    if (content) {
      await writeAsync(getConfigPath(fileName), content);
    } else {
      throw new Error(`Error rendering ${teplateName} template`);
    }
  } catch {
    throw new Error(`Error setting ${teplateName} template`);
  }
};

export default setFishConfig;