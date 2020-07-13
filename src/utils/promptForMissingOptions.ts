import inquirer from 'inquirer';
import { TOptions } from './parseArgumentsIntoOptions';

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export default async function promptForMissingOptions(options: TOptions) {
  if (options.skipPrompts) return options;

  const { update, git, ssh, fish, brew, password } = options;
  const questions = [];

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

  if (!fish) {
    questions.push({
      type: 'confirm',
      name: 'fish',
      message: 'Install fish?',
      default: true,
    });
  }

  if (!brew) {
    questions.push({
      type: 'confirm',
      name: 'brew',
      message: 'Install Brew?',
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);

  const passwordQuestion = [];
  const isPasswordRequired =
    [
      update,
      answers.update,
      ssh,
      answers.ssh,
      fish,
      answers.fish,
      brew,
      answers.brew,
    ].some(Boolean) && !password;

  if (isPasswordRequired) {
    passwordQuestion.push({
      type: 'password',
      name: 'password',
      message: 'WSL password?',
      validate: passwordValidator,
    });
  }

  const passwordAnswer = await inquirer.prompt(passwordQuestion);

  return {
    ...options,
    password: password || (passwordAnswer.password as string),
    update: update || (answers.update as boolean),
    git: git || (answers.git as boolean),
    ssh: ssh || (answers.ssh as boolean),
    brew: brew || (answers.brew as boolean),
    fish: fish || (answers.fish as boolean),
  };
}
