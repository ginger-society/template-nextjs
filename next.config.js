const path = require('path')

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	// ... rest of the configuration.
	experimental: {},
	output: 'standalone',
}
