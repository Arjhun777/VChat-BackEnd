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
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
  env: {
    development: {
      sourceMaps: true,
      retainLines: true,
    },
  },
};
