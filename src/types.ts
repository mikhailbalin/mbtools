export type TOptions = {
  password: string | undefined;
  update: boolean;
  git: boolean;
  ssh: boolean;
  fish: boolean;
  brew: boolean;
  skipPrompts: boolean;
};

export type TContext = Pick<TOptions, 'git' | 'ssh' | 'fish'> & {
  brew:
    | {
        node: boolean;
        yarn:
          | {
              serve: boolean;
              lerna: boolean;
              pkg: boolean;
              uuid: boolean;
              '@vue/cli': boolean;
              'json-server': boolean;
              'gatsby-cli': boolean;
              'npm-check-updates': boolean;
              'package-size': boolean;
            }
          | boolean;
        php: boolean;
        imagemagick: boolean;
        ffmpeg: boolean;
        'azure-cli': boolean;
        'git-lfs': boolean;
        'git-flow-avh': boolean;
      }
    | boolean;
  display: boolean;
};
