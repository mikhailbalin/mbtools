import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      '--update': Boolean,
      '--git': Boolean,
      '--ssh': Boolean,
      '--install': Boolean,
      '--yes': Boolean,
      '-u': '--update',
      '-g': '--git',
      '-i': '--install',
      '-y': '--yes',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    update: args['--update'] || false,
    git: args['--git'] || false,
    ssh: args['--ssh'] || false,
    runInstall: args['--install'] || false,
    skipPrompts: args['--yes'] || false,
  };
}

export type TOptions = ReturnType<typeof parseArgumentsIntoOptions>;
export default parseArgumentsIntoOptions;
