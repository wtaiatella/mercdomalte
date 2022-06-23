import Head from 'next/head';
import { Title } from '../components/Common/Title';
import { TextBlock } from '../components/Common/TextBlock';
import { Dashboard } from '../components/Dashboard/Index';

export default function Home() {
	return (
		<>
			<Head>
				<title>Mercado do Malte</title>
			</Head>
			<div>
				<Title>Tabela de Arquivos!</Title>
				<TextBlock>
					Fala cervejeiro! Estamos montando a maior biblioteca
					cervejeira online para facilitar a sua sede por informações.
					Se tiver algum documento que possa contribuir, faça o login
					e carrege seu arquivo!
				</TextBlock>
				<Dashboard />
			</div>
		</>
	);
}
