# mbtools

Commands defined by `bin` key inside `package.json`.

## Development

To test the script globally install a symlink linking to current project:

```
npm link
```

## Build

To build the executable run:

```
yarn build
```

Don't forget to provide the `DROPBOX_ACCESS_TOKEN` environment variable before running the executable. You can generate it [here](https://www.dropbox.com/developers/apps).
