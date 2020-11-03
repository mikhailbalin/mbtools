import { ListrTaskWrapper } from 'listr';
import type { TContext } from '../../types';
import { execAsRoot } from '../../utils';

export async function installFish(
  ctx: TContext,
  task: ListrTaskWrapper,
  password: string,
) {
  try {
    const commands = [
      'apt-add-repository ppa:fish-shell/release-3',
      'apt-get update',
      'apt-get install fish -y',
    ] as const;

    for (const command of commands) {
      await execAsRoot(command, password);
    }

    ctx.fish = true;
  } catch (error) {
    task.skip(error.message);
  }
}
