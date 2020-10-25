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
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          extensions: [".js", ".jsx", ".es", ".es6", ".mjs"],
          root: ['./'],
          alias: {
            'Src': './src',
            'Routes': './src/routes',
            'Models': './src/models'
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
  