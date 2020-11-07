import { ListrTaskWrapper } from 'listr';
import { TContext, TYarn } from '../types';

export async function installYarnApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TYarn,
) {
  try {
    task.output = '';

    // ctx.brew.yarn = true;
  } catch (error) {
    task.skip(error.message);
  }
}
