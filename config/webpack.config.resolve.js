const path = require('path');

/**
 * Determine the extensions and array of extensions that should be used to resolve modules.
 */
module.exports = {
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, '../src/'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.join(__dirname, '../src/components'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@hoc': path.resolve(__dirname, '../src/hoc'),
      '@actions': path.resolve(__dirname, '../src/store/actions'),
      '@reducers': path.resolve(__dirname, '../src/store/reducers'),
      '@sagas': path.resolve(__dirname, '../src/store/sagas'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
  },
};
