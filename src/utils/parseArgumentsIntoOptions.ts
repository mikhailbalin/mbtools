import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      '--password': String,
      '--update': Boolean,
      '--git': Boolean,
      '--ssh': Boolean,
      '--yes': Boolean,
      '-p': '--password',
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
    password: args['--password'] || '',
    update: args['--update'] || false,
    git: args['--git'] || false,
    ssh: args['--ssh'] || false,
    skipPrompts: args['--yes'] || false,
  };
}

export type TOptions = ReturnType<typeof parseArgumentsIntoOptions>;
export default parseArgumentsIntoOptions;
