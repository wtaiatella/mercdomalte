import Head from 'next/head';

import { Title } from '../../components/Common/Title';
import { TextBlock } from '../../components/Common/TextBlock';
import RegisterForm from '../../components/RegisterForm';

export default function Register() {
	return (
		<>
			<Head>
				<title>MdM - Cadastro</title>
			</Head>
			<main
				style={{
					maxWidth: '650px',
					margin: '0 auto',
					padding: '0 1.5rem',
				}}
			>
				<Title>Cadastro de usuário</Title>
				<TextBlock>
					Faça o seu registro e tenha acesso a todos os documentos do
					site.
				</TextBlock>
				<RegisterForm />
			</main>
		</>
	);
}
