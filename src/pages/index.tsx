import Head from 'next/head';
import { Title } from '../components/Common/Title';
import { TextBlock } from '../components/Common/TextBlock';
import { Dashboard } from '../components/Dashboard/Index';
import { API } from './../services/constants';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

export const getServerSideProps = async () => {
	const responsefiles = await fetch(`${API}/file`);
	//console.log(`Aqui está o responsefile`);
	//console.log(responsefiles);

	const files = await responsefiles.json();
	console.log(`Aqui estão os files do site`);
	console.log(files);

	return {
		props: {
			files, // props for the Home component
			API,
		},
	};
};

export default function Home({ files, API }) {
	const { setUrlBackendApi } = useContext(UserContext);
	console.log('Página Home');

	useEffect(() => {
		console.log(API);
		setUrlBackendApi(API);
	}, [API]);

	console.log(files);

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
				<Dashboard files={files} />
			</div>
		</>
	);
}
