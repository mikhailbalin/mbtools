import Listr from 'listr';
import os from 'os';
import path from 'path';
import { readAsync, writeAsync } from 'fs-jetpack';
import { TOptions } from '../utils/parseArgumentsIntoOptions';
import renderTemplate from '../utils/renderTempate';
// import execAsRoot from '../utils/execAsRoot';

const writeConfig = async (
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
    yarn: true,
  });

  if (configContent) {
    await writeAsync(
      `${os.homedir()}/.config/fish${
        fileName !== 'config' ? '/functions' : ''
      }/${fileName}.fish`,
      configContent,
    );
  }
};

export async function installFish(
  task: Listr.ListrTaskWrapper,
  options: Omit<TOptions, 'skipPrompts'>,
) {
  task.output = 'Installing...';

  // const commands = [
  //   'apt-add-repository ppa:fish-shell/release-3',
  //   'apt-get update',
  //   'apt-get install fish -y',
  // ];

  // for (const command of commands) {
  //   await execAsRoot(command, options.password!);
  // }

  task.output = 'Setting config...';

  await writeConfig('config', options);
  await writeConfig('fish_prompt', options);

  return Promise.resolve('Fish installed');
}
