import { TOptions } from '../utils/parseArgumentsIntoOptions';
import renderTemplate from '../utils/renderTempate';
import path from 'path';
import Listr from 'listr';
import { readAsync, writeAsync } from 'fs-jetpack';
import os from 'os';
import execAsRoot from '../utils/execAsRoot';

export async function installFish(
  task: Listr.ListrTaskWrapper<any>,
  options: Omit<TOptions, 'skipPrompts'>,
) {
  (async function () {
    task.output = 'Installing...';

    const commands = [
      'apt-add-repository ppa:fish-shell/release-3',
      'apt-get update',
      'apt-get install fish -y',
    ];

    for (const command of commands) {
      await execAsRoot(command, options.password);
    }
  })();

  task.output = 'Setting config...';

  const templates = path.join(__dirname, '..', 'templates');

  const fishConfigTemplate = path.join(templates, 'config.fish.ejs');
  // let fishPromptTemplate = path.join(templates, 'fish_prompt.fish.ejs');

  let fishConfigTemplateContents = await readAsync(fishConfigTemplate);
  fishConfigTemplateContents = await renderTemplate(
    fishConfigTemplateContents,
    options,
  );

  if (fishConfigTemplateContents) {
    await writeAsync(
      `${os.homedir()}/.config/fish/config.fish`,
      fishConfigTemplateContents,
    );
  }

  return Promise.resolve('Fish installed');
}
