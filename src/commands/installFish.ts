import { TOptions } from '../utils/parseArgumentsIntoOptions';
import renderTemplate from '../utils/renderTempate';
import path from 'path';
import Listr from 'listr';
import { readAsync, writeAsync } from 'fs-jetpack';
import os from 'os';
import execAsRoot from '../utils/execAsRoot';

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

  const templates = path.join(__dirname, '..', 'templates');

  const fishConfigTemplatePath = path.join(templates, 'config.fish.ejs');
  // let fishPromptTemplate = path.join(templates, 'fish_prompt.fish.ejs');

  const fishConfigTemplate = await readAsync(fishConfigTemplatePath);
  const fishConfigContent = await renderTemplate(fishConfigTemplate, options);

  if (fishConfigContent) {
    await writeAsync(
      `${os.homedir()}/.config/fish/config.fish`,
      fishConfigContent,
    );
  }

  return Promise.resolve('Fish installed');
}
