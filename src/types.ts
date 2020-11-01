import { parseArgumentsIntoOptions } from './utils';

export type TOptions = ReturnType<typeof parseArgumentsIntoOptions>;
export type TContext = Partial<
  Pick<TOptions, 'fish' | 'ssh' | 'brew'> & {
    display: boolean;
    yarn: boolean;
  }
>;
