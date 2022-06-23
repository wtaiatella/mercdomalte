import Head from 'next/head';
import React, { createElement, useState } from 'react';
import { MenuProps, Space } from 'antd';
import { Layout, Menu } from 'antd';
import { ProfileOutlined, UserOutlined } from '@ant-design/icons';

import { Container } from '../../styles/myaccountstyles';
import { UserDashboard } from '../../components/UserDashboard/Index';
import UserDada from '../../components/UserData';
const { Content, Sider } = Layout;

export default function MinhaConta() {
	const [menuKey, setMenuKey] = useState('2');

	const items: MenuProps['items'] = [UserOutlined, ProfileOutlined].map(
		(icon, index) => ({
			key: String(index + 1),
			icon: React.createElement(icon),
			label: `nav ${index + 1}`,
		})
	);

	const onSelect = ({ key }) => {
		console.log(key);
		setMenuKey(key);
	};

	const menuList: MenuProps['items'] = [
		{
			key: '1',
			icon: createElement(UserOutlined),
			label: 'Meus dados',
		},
		{
			key: '2',
			icon: createElement(ProfileOutlined),
			label: 'Meus Arquivos',
		},
	];

	return (
		<>
			<Head>
				<title>MdM - Minha Conta</title>
			</Head>
			<Container
				style={{
					position: 'relative',
					height: '100%',
				}}
			>
				<h1>Minha Conta</h1>

				<Layout>
					<Sider>
						<Menu
							//theme='dark'

							mode='inline'
							defaultSelectedKeys={['2']}
							style={{
								height: '100%',
								width: '200px',
								position: 'relative',
							}}
							items={menuList}
							onSelect={onSelect}
						/>
					</Sider>
					<Content>
						{menuKey === '1' && <UserDada />}
						{menuKey === '2' && <UserDashboard />}
					</Content>
				</Layout>
			</Container>
		</>
	);
}

//<Content>

//</Content>
