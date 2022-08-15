import Head from 'next/head';

import { Title } from '../../components/Common/Title';
import { TextBlock } from '../../components/Common/TextBlock';
import LoginForm from '../../components/LoginForm';

export default function Login() {
	return (
		<>
			<Head>
				<title>MdM - Login</title>
			</Head>
			<main
				style={{
					maxWidth: '650px',
					margin: '0 auto',
					padding: '0 1.5rem',
				}}
			>
				<Title>Identificação do usuário</Title>
				<TextBlock>
					Faça o seu login e tenha acesso a todos os documentos do
					site.
				</TextBlock>
				<LoginForm />
			</main>
		</>
	);
}
