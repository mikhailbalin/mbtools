import execAsRoot from '../utils/execAsRoot';

export async function updateSystem(password: string) {
  try {
    const apt = 'apt-get';
    await execAsRoot(`${apt} update`, password);
    await execAsRoot(`${apt} upgrade -y`, password);
  } catch {
    throw new Error('System update');
  }
}
