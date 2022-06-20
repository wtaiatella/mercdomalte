import Head from 'next/head';

import { Form, Input, Button } from 'antd';

import { Container } from './styles';

import { UserOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';

export default function UserData() {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Head>
				<title>MdM - Cadastro</title>
			</Head>
			<Container>
				<h1>Cadastro de usuário</h1>
				<p>
					Faça o seu login e tenha acesso a todos os documentos do
					site.
				</p>
				<Form
					name='register'
					className='register-form'
					initialValues={{ remember: false }}
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					size='large'
				>
					<Form.Item
						label='Nome'
						name='name'
						rules={[
							{
								type: 'string',
								message: 'Por favor, digite seu nome',
							},
						]}
					>
						<Input
							prefix={
								<UserOutlined className='site-form-item-icon' />
							}
							placeholder='Digite seu nome'
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 5 }}>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Alterar
						</Button>
					</Form.Item>

					<Form.Item
						label='E-mail'
						name='email'
						rules={[
							{
								type: 'email',
							},
						]}
					>
						<Input
							prefix={
								<MdOutlineEmail className='site-form-item-icon' />
							}
							placeholder='Digite seu e-mail'
							disabled
						/>
					</Form.Item>

					<Form.Item label='Senha' name='passwordMain'>
						<Button>Quer atualizar sua senha? Clique aqui.</Button>
					</Form.Item>
				</Form>
			</Container>
		</>
	);
}
