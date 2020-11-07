import { ListrTaskWrapper } from 'listr';
import { TBrew, TContext } from '../types';

export async function installBrewApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TBrew,
) {
  try {
    task.output = '';

    ctx.brew = true;
  } catch (error) {
    task.skip(error.message);
  }
}
