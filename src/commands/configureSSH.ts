/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

export function configureSSH() {
  // dbx.filesListFolder({ path: '' }).then((res) => console.log(res));
  console.log(process.env.DROPBOX_ACCESS_TOKEN);
}
