import os from 'os';
import path from 'path';

export const getConfigPath = (fileName: string) =>
  path.join(
    os.homedir(),
    '.config',
    'fish',
    fileName !== 'config' ? `functions/${fileName}.fish` : `${fileName}.fish`,
  );
