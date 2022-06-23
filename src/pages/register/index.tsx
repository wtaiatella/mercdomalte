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
					width: '500px',
					margin: '0 auto',
					padding: '0 1rem',
				}}
			>
				<Title>Cadastro de usuário</Title>
				<TextBlock>
					Faça o seu login e tenha acesso a todos os documentos do
					site.
				</TextBlock>
				<RegisterForm />
			</main>
		</>
	);
}
