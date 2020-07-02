import chalk from 'chalk';
import Listr from 'listr';
import { updateSystem, configureGit } from './commands';
import { TOptions } from './utils/parseArgumentsIntoOptions';

export async function createProject(options: TOptions) {
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
  ]);

  await tasks.run();

  console.info('%s Everything ready', chalk.green.bold('DONE'));
  return true;
}
