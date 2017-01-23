# Typed Riot

[![Greenkeeper badge](https://badges.greenkeeper.io/effervescentia/typed-riot.svg)](https://greenkeeper.io/)

[![CircleCI](https://circleci.com/gh/effervescentia/typed-riot.svg?style=svg)](https://circleci.com/gh/effervescentia/typed-riot)

The type definition for [`riot`](https://github.com/riot/riot)

## LICENSE

MIT

## Contributing

```sh
# Fork this repo
npm install

npm run watch

# add tests, make changes, pass tests ... then [ctrl+c]
npm run publish
```

## Updating

Update `typings.json/version` to match the source version you are typing against.
e.g. if you are creating typings for `chai@3.5.0`, then:
```js
// typings.json
{
  "version": "3.5.0"
  // ...
}
```
