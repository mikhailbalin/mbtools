import { copyAsync } from 'fs-jetpack';
import { TOptions } from './parseArgumentsIntoOptions';

export default async function copyTemplateFiles(
  options: TOptions,
  from: string,
  to: string,
) {
  copyAsync(from, to, { overwrite: true });
}
