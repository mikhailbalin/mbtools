import ejs from 'ejs';
import type { TFishConfigOptions } from '../types';

export default async function renderTemplate(
  content: string | undefined,
  options: TFishConfigOptions,
) {
  if (!content) return '';
  return await ejs.render(content, options, { async: true });
}
