import inquirer from 'inquirer';
import { ARG_BREW, ARG_FISH, ARG_GIT, ARG_SSH, ARG_UPDATE } from '../constants';
import type { TOptions } from '../types';

const includesAny = <T>(arr: T[], values: T[]) =>
  values.some((v) => arr.includes(v));

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
  const {
    update,
    git,
    ssh,
    fish,
    brew,
    password: optionsPassword,
    skipPrompts,
  } = options;

  let answers: string[] | null = null;
  let password: string | null = optionsPassword;

  if (!skipPrompts) {
    const questions = [
      {
        type: 'checkbox',
        name: 'actions',
        message: 'What would you like to do?',
        choices: [
          { name: 'Update system', value: ARG_UPDATE, checked: update },
          { name: 'Configure git', value: ARG_GIT, checked: git },
          { name: 'Configure ssh', value: ARG_SSH, checked: ssh },
          { name: 'Install fish', value: ARG_FISH, checked: fish },
          { name: 'Install Brew', value: ARG_BREW, checked: brew },
        ],
      },
    ] as const;

    const resault = await inquirer.prompt(questions);
    answers = resault.actions;
  }

  const shouldAskPassword =
    skipPrompts ||
    (answers && includesAny([ARG_UPDATE, ARG_FISH, ARG_BREW], answers));

  if (!password && shouldAskPassword) {
    const resault = await inquirer.prompt({
      type: 'password',
      name: 'password',
      message: 'WSL password?',
      validate: passwordValidator,
    });

    password = resault.password;
  }

  const getOptionValue = (
    value: keyof Omit<TOptions, 'skipPrompts' | 'password'>,
  ) => (answers && answers.includes(value)) || options[value];

  return {
    password,
    update: getOptionValue(ARG_UPDATE),
    git: getOptionValue(ARG_GIT),
    ssh: getOptionValue(ARG_SSH),
    fish: getOptionValue(ARG_FISH),
    brew: getOptionValue(ARG_BREW),
  };
}
