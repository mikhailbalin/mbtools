import { parseArgumentsIntoOptions } from './utils';

export type TOptions = ReturnType<typeof parseArgumentsIntoOptions>;
export type TContext = Pick<TOptions, 'fish' | 'ssh' | 'git'> & {
  display: boolean;
  homebrew: {
    brew: boolean;
    yarn: boolean;
  };
};
