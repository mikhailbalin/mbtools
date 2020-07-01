import inquirer from 'inquirer';
import { TOptions } from './parseArgumentsIntoOptions';

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export default async function promptForMissingOptions(options: TOptions) {
  if (options.skipPrompts) return options;

  const { update, git, ssh, password } = options;
  const questions = [];
  const isPasswordRequired = !(update || ssh) && !password;

  if (isPasswordRequired) {
    questions.push({
      type: 'password',
      name: 'password',
      message: 'WSL password?',
      validate: passwordValidator,
    });
  }

  if (!update) {
    questions.push({
      type: 'confirm',
      name: 'update',
      message: 'Update system?',
      default: true,
    });
  }

  if (!git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Configure git?',
      default: true,
    });
  }

  if (!ssh) {
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
    password: password || (answers.password as string),
    update: update || (answers.update as boolean),
    git: git || (answers.git as boolean),
    ssh: ssh || (answers.ssh as boolean),
  };
}
