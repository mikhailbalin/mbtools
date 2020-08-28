import chalk from 'chalk';
import Listr from 'listr';
import {
  updateSystem,
  configureGit,
  installFish,
  configureSSH,
} from './commands';
import { TOptions } from './utils/parseArgumentsIntoOptions';

export async function createProject(options: Omit<TOptions, 'skipPrompts'>) {
  const tasks = new Listr([
    {
      title: 'System update',
      task: () => updateSystem(options),
      enabled: () => options.update,
    },
    {
      title: 'Initialize git',
      task: () => configureGit(),
      enabled: () => options.git,
    },
    {
      title: 'Configure fish',
      task: (ctx, task: Listr.ListrTaskWrapper<any>) =>
        installFish(task, options),
      enabled: () => options.fish,
    },
    {
      title: 'Configure SSH',
      task: () => configureSSH(),
      enabled: () => options.ssh,
    },
  ]);

  await tasks.run();

  console.info('%s Everything ready', chalk.green.bold('DONE'));
  return true;
}
