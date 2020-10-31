import Listr from 'listr';
import execa from 'execa';
import type { TOptions } from '../utils/parseArgumentsIntoOptions';
import { checkInstalled, execAsRoot, setFishConfig } from '../utils';

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

  await setFishConfig('config', options);
  await setFishConfig('fish_prompt', options);

  if (isInstalled) return;

  const defaultShellProcess = execa.command('chsh -s /usr/bin/fish');

  defaultShellProcess.stderr?.on('data', (data) => {
    const chunk = data.toString('utf8');
    if (chunk.includes('Password')) {
      defaultShellProcess.stdin?.write(`${options.password}\n`);
    }
  });

  await defaultShellProcess;

  await execa.command('set fish_greeting', { shell: 'fish' });
}
