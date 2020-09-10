import execAsRoot from '../utils/execAsRoot';

export async function updateSystem(password: string | null) {
  const responce = await execAsRoot('apt-get update', password!);
  return responce;
}
