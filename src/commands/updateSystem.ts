import execAsRoot from '../utils/execAsRoot';

export async function updateSystem(password: string) {
  const apt = 'apt-get';
  await execAsRoot(`${apt} update`, password);
  await execAsRoot(`${apt} upgrade -y`, password);
}
