import Head from 'next/head';
import { Dashboard } from '../components/Dashboard/Index';
import { Container } from './styles';

export default function Home() {
	return (
		<>
            <Head>
				<title>Mercado do Malte</title>
			</Head>
			<Container>
				<h1>Tabela de Arquivos</h1>
				<p>
					Fala cervejeiro! Estamos montando a maior biblioteca
					cervejeira online para facilitar a sua sede por informações.
					Se tiver algum documento que possa contribuir, faça o login
					e carrege seu arquivo!
				</p>
				<Dashboard />
			</Container>
		</>
	);
}
