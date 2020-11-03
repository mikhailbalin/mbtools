import os from 'os';
import path from 'path';
import { writeAsync } from 'fs-jetpack';
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import execa from 'execa';
import { ListrTaskWrapper } from 'listr';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { TContext } from '../types';
import { setFishConfig } from './installFish';

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

export async function configureSSH(ctx: TContext, task: ListrTaskWrapper) {
  try {
    const response: any = await dbx.filesListFolder({ path: '/ssh' });
    const sshFolderPath = path.join(os.homedir(), '.ssh');

    for (const file of response.result.entries) {
      const data: any = await dbx.filesDownload({ path: file.path_lower });
      const filePath = path.join(sshFolderPath, data.result.name);
      await writeAsync(filePath, data.result.fileBinary);
      await execa.command(`chmod 600 ${filePath}`);
    }

    await execa.command(`chmod 700 ${sshFolderPath}`);

    setFishConfig('config', set(cloneDeep(ctx), 'ssh', true));

    ctx.ssh = true;
  } catch {
    task.skip('SSH config error');
  }
}
