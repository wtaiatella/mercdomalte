import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Container, Content } from '../styles/global';
import { Header } from '../components/Header';
import 'antd/dist/antd.less';
import 'antd/dist/antd.variable.min.css';
import { UserStorage } from '../contexts/UserContext';

import { ConfigProvider } from 'antd';

const theme = {
	colors: {
		primary: '',
	},
};

ConfigProvider.config({
	theme: {
		primaryColor: '#6E3435',
	},
});

export default function App({ Component, pageProps }) {
	return (
		<>
			<UserStorage>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<ConfigProvider>
						<Container>
							<Content>
								<Header />
								<Component {...pageProps} />
							</Content>
						</Container>
					</ConfigProvider>
				</ThemeProvider>
			</UserStorage>
		</>
	);
}
