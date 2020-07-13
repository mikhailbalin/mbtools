import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      '--password': String,
      '--update': Boolean,
      '--git': Boolean,
      '--ssh': Boolean,
      '--fish': Boolean,
      '--brew': Boolean,
      '--yes': Boolean,
      '-p': '--password',
      '-u': '--update',
      '-g': '--git',
      '-f': '--fish',
      '-b': '--brew',
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
    fish: args['--fish'] || false,
    brew: args['--brew'] || false,
    skipPrompts: args['--yes'] || false,
  };
}

export type TOptions = ReturnType<typeof parseArgumentsIntoOptions>;
export default parseArgumentsIntoOptions;
