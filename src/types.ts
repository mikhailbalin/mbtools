export type TOptions = {
  password: string | undefined;
  update: boolean;
  git: boolean;
  ssh: boolean;
  fish: boolean;
  brew: boolean;
  skipPrompts: boolean;
};

export type TYarn = {
  serve: boolean;
  lerna: boolean;
  pkg: boolean;
  uuid: boolean;
  '@vue/cli': boolean;
  'json-server': boolean;
  'gatsby-cli': boolean;
  'npm-check-updates': boolean;
  'package-size': boolean;
};

export type TBrew = {
  node: boolean;
  yarn: TYarn | boolean;
  php: boolean;
  imagemagick: boolean;
  ffmpeg: boolean;
  'azure-cli': boolean;
  'git-lfs': boolean;
  'git-flow-avh': boolean;
};

export type TContext = Pick<TOptions, 'git' | 'ssh' | 'fish'> & {
  brew: TBrew | boolean;
  display: boolean;
};

export type TCombinedContext = Pick<TOptions, 'password' | 'update'> & TContext;
