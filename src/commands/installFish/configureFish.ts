import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import type { TContext } from '../../types';
import { makeDefaultShell } from './makeDefaultShell';
import setFishConfig from './setFishConfig';

export async function configureFish(
  ctx: TContext,
  task: ListrTaskWrapper,
  password: string,
) {
  try {
    await setFishConfig('config', ctx);
    await setFishConfig('fish_prompt', ctx);
    await makeDefaultShell(password);
    await execa.command('set fish_greeting', { shell: 'fish' });
  } catch (error) {
    task.skip(error.shortMessage || error.message);
  }
}
