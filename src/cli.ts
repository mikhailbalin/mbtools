import parseArgumentsIntoOptions from './utils/parseArgumentsIntoOptions';
import promptForMissingOptions from './utils/promptForMissingOptions';

export async function run(args: string[]) {
  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(rawOptions);
  console.log(options);
}
