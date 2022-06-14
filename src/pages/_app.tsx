import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { Header } from '../components/Header';
import 'antd/dist/antd.css';

const theme = {
	colors: {
		primary: '#0070f3',
	},
};

export default function App({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Header />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
