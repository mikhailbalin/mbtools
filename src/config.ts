import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import Configstore from 'configstore';
import { exists, write } from 'fs-jetpack';
import { TContext } from './types';

dotenv.config();

const configFile = path.join(os.homedir(), 'mbtools.json');

if (!exists(configFile)) {
  const config: TContext = {
    fish: false,
    ssh: false,
    brew: false,
    display: false,
    yarn: false,
  };
  write(configFile, JSON.stringify(config, null, 2));
}

new Configstore(configFile, { foo: 'bar' });
