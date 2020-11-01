import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import type { TContext } from '../../types';
import { checkInstalled, execAsRoot } from '../../utils';
import { makeDefaultShell } from './makeDefaultShell';
import setFishConfig from './setFishConfig';

export async function installFish(
  task: ListrTaskWrapper,
  context: TContext,
  password: string,
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
        await execAsRoot(command, password);
      }
    }

    task.output = 'Setting config...';

    await setFishConfig('config', context);
    await setFishConfig('fish_prompt', context);

    if (isInstalled) return;

    await makeDefaultShell(password);

    await execa.command('set fish_greeting', { shell: 'fish' });
  } catch {
    throw new Error('Fish config');
  }
}
