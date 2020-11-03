import Listr, { ListrTaskWrapper } from 'listr';
import chalk from 'chalk';
import {
  updateSystem,
  configureGit,
  installFish,
  configureSSH,
  installBrew,
  setupConfigs,
} from './commands';
import type { TOptions, TContext } from './types';
import {
  NOTHING_HAPPENED,
  EVERYTHING_READY,
  SOMETHING_BROKE,
} from './constants';
import { config } from './config';

const none = <T>(arr: T[], fn = Boolean) => !arr.some(fn);

export async function setupSystem(options: Omit<TOptions, 'skipPrompts'>) {
  const { password, ...rest } = options;

  if (none(Object.values(rest))) {
    console.info(NOTHING_HAPPENED);
    return;
  }

  const tasks = new Listr([
    {
      title: 'System update',
      task: (_, task: ListrTaskWrapper) => updateSystem(task, password!),
      enabled: () => options.update,
    },
    {
      title: 'Initialize git',
      task: (ctx: TContext, task: ListrTaskWrapper) => configureGit(ctx, task),
      enabled: () => options.git,
      skip: (ctx: TContext) => ctx.git && 'Git already configured',
    },
    {
      title: 'Configure fish',
      // task: (ctx: TContext, task: ListrTaskWrapper) =>
      //   installFish(ctx, task, password!),
      task: (ctx: TContext, task: ListrTaskWrapper) => {
        return new Listr(
          [
            {
              title: 'Install fish',
              task: () => installFish(ctx, task, password!),
              skip: () => ctx.fish && 'Fish already installed',
            },
            {
              title: 'Setup configs',
              task: () => setupConfigs(ctx, task, password!),
            },
          ],
          { concurrent: true },
        );
      },
      enabled: () => options.fish,
      // skip: (ctx: TContext) => ctx.fish && 'Fish already installed',
    },
    {
      title: 'Configure SSH',
      task: (ctx: TContext, task: ListrTaskWrapper) => configureSSH(ctx, task),
      enabled: () => options.ssh,
      skip: (ctx: TContext) => {
        if (!ctx.fish) {
          return 'Fish should be installed';
        }

        if (ctx.ssh) return 'SSH already configured';
      },
    },
    {
      title: 'Install Brew',
      task: (ctx: TContext, task: ListrTaskWrapper) =>
        installBrew(ctx, task, password!),
      enabled: () => options.brew,
      skip: (ctx: TContext) => {
        if (!ctx.fish) {
          return 'Fish should be installed';
        }

        if (ctx.brew) return 'Brew already installed';
      },
    },
  ]);

  try {
    const ctx = await tasks.run(config.all);
    config.all = ctx;
    console.info(`\n${EVERYTHING_READY}`);
  } catch (error) {
    if (error.message) {
      console.error(`\n${chalk.red.bold('ERROR')} ${error.message}`);
    } else {
      console.error(`\n${SOMETHING_BROKE}`);
    }
  }
}
