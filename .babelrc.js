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
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties'
    ],
    env: {
      development: {
        sourceMaps: true,
        retainLines: true,
      },
    },
  };
  