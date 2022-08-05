import Head from 'next/head';
import { useRouter } from 'next/router';

import { Form, Input, Button } from 'antd';

import { Container } from './styles';

import { UserOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function UserData() {
	const { session, setSession } = useContext(UserContext);
	const [updatePassword, setUpdatePassword] = useState(false);

	const { name, email } = session;

	const onFinishUpdadeName = async (values: any) => {
		console.log('Received values of form: ', values);
		const response = await fetch('http://localhost:5500/user/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(values),
		});

		const resp = await response.json();
		console.log(resp);

		if (resp.status) {
			const { name } = resp.data;
			const code = resp.code;
			setSession({
				...session,
				name,
				code,
			});
		} else {
			console.log('Erro no update do nome de usuário');
			const code = resp.code;
			setSession({
				...session,
				code,
			});
		}
	};

	const onFinishFailedUpdateName = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const onFinishUpdadePassword = async (values: any) => {
		console.log('Received values of form: ', values);
		const { password, passwordnew, confirmPassword } = values;

		const response = await fetch(
			'http://localhost:5500/user/updatepassword',
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					passwordnew,
				}),
			}
		);

		const resp = await response.json();
		console.log(resp);

		if (resp.status) {
			const { name } = resp.data;
			const code = resp.code;
			setSession({
				...session,
				name,
				code,
			});
		} else {
			console.log('Erro no update do nome de usuário');
			const code = resp.code;
			setSession({
				...session,
				code,
			});
		}
	};

	const onFinishFailedUpdatePassword = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Head>
				<title>MdM - Cadastro</title>
			</Head>
			<Container>
				<h1>Dados de cadastro</h1>
				<Form
					name='userNameUpdate'
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinishUpdadeName}
					onFinishFailed={onFinishFailedUpdateName}
					size='large'
				>
					<Form.Item
						label='Nome'
						name='name'
						initialValue={name}
						rules={[
							{
								type: 'string',
								message: 'Por favor, digite seu nome',
							},
						]}
					>
						<Input prefix={<UserOutlined />} />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 5 }}>
						<Button type='primary' htmlType='submit'>
							Alterar
						</Button>
					</Form.Item>

					<Form.Item label='E-mail' name='email' initialValue={email}>
						<Input prefix={<MdOutlineEmail />} disabled />
					</Form.Item>
				</Form>
				<Form
					name='passwordUpdate'
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinishUpdadePassword}
					onFinishFailed={onFinishFailedUpdatePassword}
					size='large'
				>
					{!updatePassword ? (
						<Form.Item wrapperCol={{ offset: 5 }}>
							<Button
								type='primary'
								onClick={() => setUpdatePassword(true)}
							>
								Atualizar senha? Clique aqui.
							</Button>
						</Form.Item>
					) : (
						<>
							<Form.Item
								name='password'
								label='Senha Atual'
								rules={[
									{
										required: true,
										message: 'Porfavor, insira sua senha!',
										type: 'string',
									},
								]}
								hasFeedback
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name='passwordnew'
								label='Nova senha'
								rules={[
									{
										required: true,
										message:
											'Porfavor, insira a nova senha!',
										type: 'string',
										min: 6,
									},
								]}
								hasFeedback
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name='confirmPassword'
								label='Confirme a Senha'
								dependencies={['passwordnew']}
								hasFeedback
								rules={[
									{
										required: true,
										message:
											'Porfavor, confirme sua senha!',
										type: 'string',
										min: 6,
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												!value ||
												getFieldValue('passwordnew') ===
													value
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													'As duas senhas são são iguais!'
												)
											);
										},
									}),
								]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 5 }}>
								<Button type='primary' htmlType='submit'>
									Confirmar
								</Button>
							</Form.Item>
						</>
					)}
				</Form>
			</Container>
		</>
	);
}
