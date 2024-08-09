import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'
					rel='stylesheet'
				></link>
				<link rel='icon' type='image/x-icon' href='favicon.png'></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
