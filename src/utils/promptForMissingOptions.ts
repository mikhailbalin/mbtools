import inquirer from 'inquirer';
import { TOptions } from './parseArgumentsIntoOptions';

const includesAny = <T>(arr: T[], values: T[]) =>
  values.some((v) => arr.includes(v));

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
  if (options.skipPrompts) return options;

  const { update, git, ssh, fish, brew, password } = options;

  const questions = [
    {
      type: 'checkbox',
      name: 'actions',
      message: 'What would you like to do?',
      choices: [
        { name: 'Update system', value: 'update', checked: update },
        { name: 'Configure git', value: 'git', checked: git },
        { name: 'Configure ssh', value: 'ssh', checked: ssh },
        { name: 'Install fish', value: 'fish', checked: fish },
        { name: 'Install Brew', value: 'brew', checked: brew },
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);

  const isPasswordRequired =
    includesAny(
      ['update', 'ssh', 'fish', 'brew'],
      answers.actions as string[],
    ) && !password;

  const passwordAnswer = isPasswordRequired
    ? await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'WSL password?',
        validate: passwordValidator,
      })
    : password;

  return {
    password: passwordAnswer as string,
    update: (answers.update as boolean) || update,
    git: (answers.git as boolean) || git,
    ssh: (answers.ssh as boolean) || ssh,
    fish: (answers.fish as boolean) || fish,
    brew: (answers.brew as boolean) || brew,
  };
}
