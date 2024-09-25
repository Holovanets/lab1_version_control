module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			// Required for expo-router
			// 'expo-router/babel',
			"module:react-native-dotenv",
			// '@babel/plugin-proposal-export-namespace-from',
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'*': './app/',
						'@/assets': './assets',
						'@/components': './components',
						'@/context': './context',
						'@/atoms': './atoms',
						'@/constants': './constants',
						'@/hooks': './hooks',
						'@/navigation': './navigation',
						'@/providers': './providers',
						'@/regex': './regex',
						'@/screens': './screens',
						'@/types': './types',
						'@/reducers': './reducers',
						'@/actions': './actions',
						'@/services': './services',
						'@/utils': './utils'
					}
				}
			]
		]
	}
}
