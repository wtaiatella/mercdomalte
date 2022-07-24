import Head from 'next/head';
import React from 'react';

import { Title } from '../../components/Common/Title';
import MyAccount from '../../components/MyAccount';

export default function MinhaConta(BACKEND_API) {
	return (
		<>
			<Head>
				<title>MdM - Minha Conta</title>
			</Head>
			<main>
				<Title>Minha Conta</Title>

				<MyAccount />
			</main>
		</>
	);
}
