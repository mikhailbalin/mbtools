import ncp from 'ncp';
import { promisify } from 'util';
import { TOptions } from './parseArgumentsIntoOptions';

const copy = promisify(ncp);

export default async function copyTemplateFiles(options: TOptions) {
  console.log(options);
  return copy('', '', {
    clobber: false,
  });
}
