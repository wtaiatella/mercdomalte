import Head from 'next/head';
import React, { useContext, useEffect } from 'react';

import { Title } from '../../components/Common/Title';
import MyAccount from '../../components/MyAccount';
import { AdminAuthProvider } from '../../contexts/auth';
import { UserContext } from '../../contexts/UserContext';

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
