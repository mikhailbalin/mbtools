import Listr from 'listr';
import chalk from 'chalk';
import {
  updateSystem,
  configureGit,
  installFish,
  // configureSSH,
} from './commands';
import { TOptions } from './utils/parseArgumentsIntoOptions';
import {
  NOTHING_HAPPENED,
  EVERYTHING_READY,
  SOMETHING_BROKE,
} from './constants';

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
      task: () => updateSystem(password!),
      enabled: () => options.update,
    },
    {
      title: 'Initialize git',
      task: () => configureGit(),
      enabled: () => options.git,
    },
    {
      title: 'Configure fish',
      task: (ctx, task: Listr.ListrTaskWrapper) => installFish(task, options),
      enabled: () => options.fish,
    },
    // {
    //   title: 'Configure SSH',
    //   task: () => configureSSH(),
    //   enabled: () => options.ssh,
    // },
  ]);

  try {
    await tasks.run();
    console.info(`\n${EVERYTHING_READY}`);
  } catch (error) {
    if (error.message) {
      console.error(`\n${chalk.red.bold('ERROR')} ${error.message}`);
    } else {
      console.error(`\n${SOMETHING_BROKE}`);
    }
  }
}
