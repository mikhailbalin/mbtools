import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import type { TFishConfigOptions } from '../../types';
import { checkInstalled, execAsRoot } from '../../utils';
import { makeDefaultShell } from './makeDefaultShell';
import setFishConfig from './setFishConfig';

export async function installFish(
  task: ListrTaskWrapper,
  options: TFishConfigOptions,
) {
  try {
    const isInstalled = await checkInstalled('fish -v');

    if (!isInstalled) {
      task.output = 'Installing...';

      const commands = [
        'apt-add-repository ppa:fish-shell/release-3',
        'apt-get update',
        'apt-get install fish -y',
      ];

      for (const command of commands) {
        await execAsRoot(command, options.password);
      }
    }

    task.output = 'Setting config...';

    await setFishConfig('config', options);
    await setFishConfig('fish_prompt', options);

    if (isInstalled) return;

    await makeDefaultShell(options.password);

    await execa.command('set fish_greeting', { shell: 'fish' });
  } catch {
    throw new Error('Fish config');
  }
}
