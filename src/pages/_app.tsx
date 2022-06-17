import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { GlobalStyle, Container, Content } from '../styles/global';
import { Header } from '../components/Header';
import 'antd/dist/antd.css';
import { UserStorage } from '../contexts/UserContext';

const theme = {
	colors: {
		primary: '#0070f3',
	},
};

export default function App({ Component, pageProps }) {
	return (
		<>
			<UserStorage>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Container>
						<Content>
							<Header />
							<Component {...pageProps} />
						</Content>
					</Container>
				</ThemeProvider>
			</UserStorage>
		</>
	);
}
