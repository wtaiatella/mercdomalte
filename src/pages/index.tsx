import Head from 'next/head';
import { Title } from '../components/Common/Title';
import { TextBlock } from '../components/Common/TextBlock';
import { Dashboard } from '../components/Dashboard/Index';
import { API } from './../services/constants';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const getServerSideProps = async () => {
	const responseMedias = await fetch(`${API}/file`);
	//console.log(`Aqui está a responseMedia`);
	//console.log(responseMedias);

	const medias = await responseMedias.json();
	console.log(`Aqui estão as medias do site`);
	console.log(medias);

	const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

	return {
		props: {
			medias, // props for the Home component
			BACKEND_API,
		},
	};
};

export default function Home({ medias, BACKEND_API }) {
	console.log(medias);
	console.log(BACKEND_API);
	const { setUrlBackendApi } = useContext(UserContext);

	setUrlBackendApi(BACKEND_API);

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
				<Dashboard medias={medias} />
			</div>
		</>
	);
}
