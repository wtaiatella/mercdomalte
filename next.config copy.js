/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');

module.exports = withLess({
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	lessLoaderOptions: {
		/* ... */
		lessOptions: {
			/* ... */
			modifyVars: {
				'primary-color': '#6E3435',
				'link-color': '#6E3435',
				'border-radius-base': '10px',
				'text-color': '#6E3435',
				'text-color-secondary': '#6E3435',
				'heading-color': '#6E3435',
				/* ... */
			},
			javascriptEnabled: true,
		},
	},
});
