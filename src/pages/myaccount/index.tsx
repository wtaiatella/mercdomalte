import Head from 'next/head';
import React from 'react';

import { Title } from '../../components/Common/Title';
import MyAccount from '../../components/MyAccount';
import { AdminAuthProvider } from '../../contexts/auth';

export default function MinhaConta() {
	return (
		<AdminAuthProvider>
			<Head>
				<title>MdM - Minha Conta</title>
			</Head>
			<main>
				<Title>Minha Conta</Title>
				<MyAccount />
			</main>
		</AdminAuthProvider>
	);
}
