import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { GlobalStyle, Container, Content } from '../styles/global';
import { UserStorage } from '../contexts/UserContext';
import { Header } from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<UserStorage>
				<GlobalStyle />
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#6E3435',
						},
					}}
				>
					<Container>
						<Content>
							<Header />
							<Component {...pageProps} />
						</Content>
					</Container>
				</ConfigProvider>
			</UserStorage>
		</>
	);

	//<Component {...pageProps} />
}
