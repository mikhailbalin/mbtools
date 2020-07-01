import inquirer from 'inquirer';
import { TOptions } from './parseArgumentsIntoOptions';

export default async function promptForMissingOptions(options: TOptions) {
  if (options.skipPrompts) return options;

  const questions = [];

  if (!options.update) {
    questions.push({
      type: 'confirm',
      name: 'update',
      message: 'Update system?',
      default: true,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Configure git?',
      default: true,
    });
  }

  if (!options.ssh) {
    questions.push({
      type: 'confirm',
      name: 'ssh',
      message: 'Configure ssh?',
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    update: options.update || answers.update,
    git: options.git || answers.git,
    ssh: options.ssh || answers.ssh,
  };
}
