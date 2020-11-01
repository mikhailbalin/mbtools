import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import Configstore from 'configstore';
import { exists, write } from 'fs-jetpack';
import { TContext } from './types';

dotenv.config();

const configFile = path.join(os.homedir(), 'mbtools.json');
const initialContext: TContext = {
  fish: false,
  ssh: false,
  brew: false,
  display: false,
  yarn: false,
};

if (!exists(configFile)) {
  write(configFile, JSON.stringify(initialContext, undefined, 2));
}

export const context = new Configstore('mbtools', undefined, {
  configPath: configFile,
});
