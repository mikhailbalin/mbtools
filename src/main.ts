import Listr, { ListrTaskWrapper } from 'listr';
import chalk from 'chalk';
import {
  updateSystem,
  configureGit,
  installFish,
  configureSSH,
  installBrew,
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
      task: (_, task: ListrTaskWrapper) => configureGit(task),
      enabled: () => options.git,
    },
    {
      title: 'Configure fish',
      task: (ctx: TContext, task: ListrTaskWrapper) =>
        installFish(task, ctx, password!),
      enabled: () => options.fish,
    },
    {
      title: 'Configure SSH',
      task: () => configureSSH(),
      enabled: () => options.ssh,
    },
    {
      title: 'Install Brew',
      task: () => installBrew(password!),
      enabled: () => options.brew,
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
