import Listr from 'listr';
import os from 'os';
import path from 'path';
import execa from 'execa';
import { readAsync, writeAsync } from 'fs-jetpack';
import { TOptions } from '../utils/parseArgumentsIntoOptions';
import { renderTemplate, checkInstalled, execAsRoot } from '../utils';

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
    yarn: false,
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
  const isInstalled = await checkInstalled('fish -v');

  if (!isInstalled) {
    task.output = 'Installing...';

    const commands = [
      'apt-add-repository ppa:fish-shell/release-3',
      'apt-get update',
      'apt-get install fish -y',
    ];

    for (const command of commands) {
      await execAsRoot(command, options.password!);
    }
  }

  task.output = 'Setting config...';

  await writeConfig('config', options);
  await writeConfig('fish_prompt', options);

  if (isInstalled) return;

  const defaultShellProcess = execa.command('chsh -s /usr/bin/fish');

  defaultShellProcess.stderr?.on('data', (data) => {
    const chunk = data.toString('utf8');
    if (chunk.includes('Password')) {
      defaultShellProcess.stdin?.write(`${options.password}\n`);
    }
  });

  await defaultShellProcess;
}
