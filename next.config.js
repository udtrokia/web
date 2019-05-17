const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');

module.exports = {
  ...withTypescript(
    withCss(withLess({
      lessLoaderOptions: {
	javascriptEnabled: true,
      }
    }))
  ),
  target: 'serverless',
}