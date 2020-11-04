import {
  ARG_BREW,
  ARG_FISH,
  ARG_GIT,
  ARG_SSH,
  ARG_UPDATE,
} from '../../constants';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import type { TOptions } from '../../types';
import { promptMainOptions } from './promptMainOptions';
import { promptPassword } from './promptPassword';

const includesAny = <T>(arr: T[], values: T[]) =>
  values.some((v) => arr.includes(v));

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
  const { password: passwordOption, skipPrompts, ...mainOptions } = options;
  const passwordRequireOptions = [ARG_UPDATE, ARG_FISH, ARG_BREW];

  const mainAnswers: string[] | null = skipPrompts
    ? null
    : await promptMainOptions(mainOptions);

  const shouldAskPassword =
    ((mainAnswers && includesAny(passwordRequireOptions, mainAnswers)) ||
      includesAny(passwordRequireOptions, keys(pickBy(mainOptions)))) &&
    !passwordOption;

  const password: string | null = shouldAskPassword
    ? await promptPassword()
    : passwordOption;

  const getOptionValue = (
    value: keyof Omit<TOptions, 'skipPrompts' | 'password'>,
  ) => (mainAnswers && mainAnswers.includes(value)) || mainOptions[value];

  return {
    password,
    update: getOptionValue(ARG_UPDATE),
    git: getOptionValue(ARG_GIT),
    ssh: getOptionValue(ARG_SSH),
    fish: getOptionValue(ARG_FISH),
    brew: getOptionValue(ARG_BREW),
  };
}
