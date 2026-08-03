const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'lucide-react-native') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'node_modules/lucide-react-native/dist/cjs/lucide-react-native.js'),
    };
  }
  if (moduleName.startsWith('lucide-react-native/')) {
    const subpath = moduleName.slice('lucide-react-native/'.length);
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'node_modules/lucide-react-native/dist/cjs', subpath + '.js'),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
