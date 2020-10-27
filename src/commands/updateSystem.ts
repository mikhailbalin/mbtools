import execAsRoot from '../utils/execAsRoot';

export async function updateSystem(password: string) {
  const responce = await execAsRoot('apt-get update', password);
  return responce;
}
