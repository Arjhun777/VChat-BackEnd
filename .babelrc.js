module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  env: {
    development: {
      sourceMaps: true,
      retainLines: true,
    },
  },
};
