import inquirer from 'inquirer';
import { TOptions } from './parseArgumentsIntoOptions';

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
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

  const passwordAnswer = isPasswordRequired
    ? await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'WSL password?',
        validate: passwordValidator,
      })
    : '';

  return {
    password: password || (passwordAnswer as string),
    update: update || (answers.update as boolean),
    git: git || (answers.git as boolean),
    ssh: ssh || (answers.ssh as boolean),
    fish: fish || (answers.fish as boolean),
    brew: brew || (answers.brew as boolean),
  };
}
