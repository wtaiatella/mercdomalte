import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { Form, Input, Button, Checkbox, message, Alert } from 'antd';

import { LockOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';

import LostPaswordModal from '../../components/LostPasswordModal';

import { Container } from './styles';

import { UserContext } from '../../contexts/UserContext';

export default function LoginForm() {
	const {
		isModalVisible,
		setIsModalVisible,
		session,
		setSession,
		urlBackendApi,
	} = useContext(UserContext);
	const router = useRouter();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values);
		const { email, password } = values;

		const response = await fetch(`${urlBackendApi}/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const resp = await response.json();
		console.log(resp);

		if (resp.status) {
			const { name, accessToken, id } = resp.data;
			const code = resp.code;
			setSession({
				accessToken,
				email,
				name,
				code,
				id,
			});
			localStorage.setItem('token', accessToken);
			router.push('/myaccount');
		} else {
			const code = resp.code;
			setSession({
				...session,
				code,
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Container>
				<Form
					name='login'
					className='login-form'
					initialValues={{ remember: true }}
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					size='large'
				>
					<Form.Item
						label='E-mail'
						name='email'
						rules={[
							{
								required: true,
								type: 'email',
								message: 'Por favor, digite seu e-mail',
							},
						]}
					>
						<Input
							prefix={
								<MdOutlineEmail className='site-form-item-icon' />
							}
							placeholder='Digite seu e-mail'
							allowClear
							autoComplete='login-form email'
						/>
					</Form.Item>
					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Por favor, digite seu password!',
							},
						]}
					>
						<Input.Password
							prefix={
								<LockOutlined className='site-form-item-icon' />
							}
							placeholder='Password'
							allowClear
							autoComplete='login-form password'
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 5 }}>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Login
						</Button>
						<Link href='/register' className='form-register-now'>
							Não possui registro ainda? Clique aqui!
						</Link>
					</Form.Item>
				</Form>
				{session.code === 404 ? (
					<Alert
						message='Usuario não encontrado'
						showIcon
						type='error'
						closable
						action={
							<Button
								size='small'
								danger
								onClick={() => router.push('/register')}
							>
								Registre-se agora
							</Button>
						}
						onClose={() => {
							const code = 30;
							setSession({
								code,
							});
						}}
					/>
				) : (
					''
				)}
				{session.code === 401 ? (
					<Alert
						message='Senha incorreta, digite novamente ou clique ao lado para atualizar.'
						showIcon
						type='error'
						closable
						action={
							<Button size='small' danger onClick={showModal}>
								Atualizar senha
							</Button>
						}
						onClose={() => {
							const code = 40;
							setSession({
								code,
							});
						}}
					/>
				) : (
					''
				)}
			</Container>

			<LostPaswordModal isOpen={isModalVisible} />
		</>
	);
}
