export interface IArguments {
  password: string | undefined;
  update: boolean;
  git: boolean;
  ssh: boolean;
  fish: boolean;
  brew: boolean;
  skipPrompts: boolean;
}

export type TContext = Pick<IArguments, 'git' | 'ssh' | 'fish'> & {
  display: boolean;
  brew:
    | {
        yarn: boolean;
      }
    | false;
};
