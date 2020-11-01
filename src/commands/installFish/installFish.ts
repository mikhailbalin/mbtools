import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import type { TContext } from '../../types';
import { execAsRoot } from '../../utils';
import { makeDefaultShell } from './makeDefaultShell';
import setFishConfig from './setFishConfig';

export async function installFish(
  task: ListrTaskWrapper,
  ctx: TContext,
  password: string,
) {
  try {
    task.output = 'Installing...';

    const commands = [
      'apt-add-repository ppa:fish-shell/release-3',
      'apt-get update',
      'apt-get install fish -y',
    ];

    for (const command of commands) {
      await execAsRoot(command, password);
    }

    task.output = 'Setting config...';

    await setFishConfig('config', ctx);
    await setFishConfig('fish_prompt', ctx);
    await makeDefaultShell(password);
    await execa.command('set fish_greeting', { shell: 'fish' });

    ctx.fish = true;
  } catch {
    task.skip('Fish install error');
  }
}
