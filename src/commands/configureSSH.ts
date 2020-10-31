import os from 'os';
import path from 'path';
import { writeAsync } from 'fs-jetpack';
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import execa from 'execa';

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

export async function configureSSH() {
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
  } catch (error) {
    throw new Error('SSH config');
  }
}
