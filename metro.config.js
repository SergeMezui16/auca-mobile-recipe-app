const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('sql');

module.exports = withNativeWind(config, { input: './global.css' });
