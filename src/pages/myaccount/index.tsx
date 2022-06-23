import Head from 'next/head';
import React from 'react';

import { Title } from '../../components/Common/Title';
import MyAccount from '../../components/MyAccount';

export default function MinhaConta() {
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
