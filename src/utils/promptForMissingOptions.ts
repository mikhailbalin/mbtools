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
  const { update, git, ssh, fish, brew, password, skipPrompts } = options;

  let answers: string[] | null = null;

  if (!skipPrompts) {
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
    ] as const;

    const resault = await inquirer.prompt(questions);
    answers = resault.actions;
  }

  const shouldAskPassword =
    skipPrompts ||
    (answers && includesAny(['update', 'ssh', 'fish', 'brew'], answers));

  const passwordAnswer: string | null = password
    ? password
    : shouldAskPassword
    ? await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'WSL password?',
        validate: passwordValidator,
      })
    : null;

  const getOptionValue = (
    value: keyof Omit<TOptions, 'skipPrompts' | 'password'>,
  ) => (answers && answers.includes(value)) || options[value];

  return {
    password: passwordAnswer,
    update: getOptionValue('update'),
    git: getOptionValue('git'),
    ssh: getOptionValue('ssh'),
    fish: getOptionValue('fish'),
    brew: getOptionValue('brew'),
  };
}
