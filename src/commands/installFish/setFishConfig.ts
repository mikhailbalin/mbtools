import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import type { TFishConfigOptions } from '../../types';
import { renderTemplate } from '../../utils';
import { getConfigPath } from './getConfigPath';

const setFishConfig = async (fileName: string, options: TFishConfigOptions) => {
  const templatePath = path.join(
    __dirname,
    `../templates/${fileName}.fish.ejs`,
  );

  const configTemplate = await readAsync(templatePath);
  const configContent = await renderTemplate(configTemplate, options);

  if (configContent) {
    await writeAsync(getConfigPath(fileName), configContent);
  }
};

export default setFishConfig;
