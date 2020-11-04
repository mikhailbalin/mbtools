import {
  ARG_BREW,
  ARG_FISH,
  ARG_GIT,
  ARG_SSH,
  ARG_UPDATE,
} from '../../constants';
import type { TOptions } from '../../types';
import { promptMainOptions } from './promptMainOptions';
import { promptPassword } from './promptPassword';

const includesAny = <T>(arr: T[], values: T[]) =>
  values.some((v) => arr.includes(v));

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
  const passwordRequireOptions = [ARG_UPDATE, ARG_FISH, ARG_BREW];
  const { password: optionsPassword, skipPrompts, ...rest } = options;

  const mainAnswers: string[] | null = skipPrompts
    ? null
    : await promptMainOptions(rest);

  const shouldAskPassword =
    mainAnswers &&
    includesAny(passwordRequireOptions, mainAnswers) &&
    !optionsPassword;

  const password: string | null = shouldAskPassword
    ? await promptPassword()
    : optionsPassword;

  const getOptionValue = (
    value: keyof Omit<TOptions, 'skipPrompts' | 'password'>,
  ) => (mainAnswers && mainAnswers.includes(value)) || options[value];

  return {
    password,
    update: getOptionValue(ARG_UPDATE),
    git: getOptionValue(ARG_GIT),
    ssh: getOptionValue(ARG_SSH),
    fish: getOptionValue(ARG_FISH),
    brew: getOptionValue(ARG_BREW),
  };
}
