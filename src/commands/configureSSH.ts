import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  accessToken:
    'sl.AgrRP8zsM4QAN2ychyL2qb_YNZHoderGb94aA6tcxkok3tIlpFRlzGxvSe6zax5O2D8lm9wIhBml8PipKwyECkjopMKhAWpw04nWdwABay1sKNT93-M8V4CbNx-VtJu5zR7lhiw',
  fetch,
});

export function configureSSH() {
  dbx.filesListFolder({ path: '' }).then((res) => console.log(res));
}
