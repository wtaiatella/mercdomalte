import React, { createElement, useState } from 'react';

import { MenuProps, Space } from 'antd';
import { Layout, Menu } from 'antd';
import {
	ProfileOutlined,
	UserOutlined,
	FileAddOutlined,
} from '@ant-design/icons';

import { UserDashboard } from '../../components/UserDashboard/Index';
import UserDada from '../../components/UserData';

import { Container } from './styles';
import NewFile from '../NewFile';

const { Content, Sider } = Layout;

export default function MyAccount() {
	const [menuKey, setMenuKey] = useState('2');

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
		{
			key: '3',
			icon: createElement(FileAddOutlined),
			label: 'Novo Arquivo',
		},
	];

	return (
		<>
			<Container>
				<Layout>
					<Sider>
						<Menu
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
						{menuKey === '3' && <NewFile />}
					</Content>
				</Layout>
			</Container>
		</>
	);
}
