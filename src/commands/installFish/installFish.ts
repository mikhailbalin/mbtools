import { ListrTaskWrapper } from 'listr';
import type { TContext } from '../../types';
import { execAsRoot } from '../../utils';

export async function installFish(
  ctx: TContext,
  task: ListrTaskWrapper,
  password: string,
) {
  try {
    // task.output = 'Installing...';

    const commands = [
      'apt-add-repository ppa:fish-shell/release-3',
      'apt-get update',
      'apt-get install fish -y',
    ] as const;

    for (const command of commands) {
      await execAsRoot(command, password);
    }

    // task.output = 'Setting config...';

    ctx.fish = true;
  } catch (error) {
    task.skip(error.message);
  }
}
