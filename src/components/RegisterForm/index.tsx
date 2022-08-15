import Head from 'next/head';
import { useContext } from 'react';

import { Form, Input, Button, Alert } from 'antd';
import LostPaswordModal from '../../components/LostPasswordModal';
import { UserContext } from '../../contexts/UserContext';

import { Container } from './styles';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';
import { useRouter } from 'next/router';

export default function RegisterForm() {
	const {
		isModalVisible,
		setIsModalVisible,
		setSession,
		session,
		urlBackendApi,
	} = useContext(UserContext);
	const showModal = () => {
		setIsModalVisible(true);
	};

	const router = useRouter();

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values);
		const { name, email, password1, password2 } = values;

		if (password1 === password2) {
			const password = password1;
			const response = await fetch(`${urlBackendApi}/user/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
			const resp = await response.json();
			console.log('Resposta do registro');
			console.log(resp);

			if (resp.status) {
				const { accessToken } = resp.data;
				const code = resp.code;
				setSession({
					accessToken,
					email,
					name,
					code,
				});
				localStorage.setItem('token', accessToken);
				router.push('/myaccount');
			} else {
				const code = resp.code;
				setSession({
					code,
				});
			}
		} else {
			console.log('passwords diferentes');
			const code = 10;
			setSession({
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
								required: true,
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
							allowClear
							autoComplete='login-form nome'
						/>
					</Form.Item>

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
						label='Senha'
						name='password1'
						rules={[
							{
								required: true,
								message: 'Por favor, digite sua senha!',
							},
						]}
					>
						<Input.Password
							prefix={
								<LockOutlined className='site-form-item-icon' />
							}
							placeholder='Crie sua senha'
							allowClear
							autoComplete='login-form password1'
						/>
					</Form.Item>

					<Form.Item
						wrapperCol={{ offset: 5 }}
						name='password2'
						rules={[
							{
								required: true,
								message: 'Os campos não coincidem.',
							},
						]}
					>
						<Input.Password
							prefix={
								<LockOutlined className='site-form-item-icon' />
							}
							placeholder='Confirme sua senha'
							allowClear
							autoComplete='login-form password2'
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 5 }}>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Registrar
						</Button>
					</Form.Item>
				</Form>
				{session.code === 400 ? (
					<Alert
						message='Usuario já cadastrado. Esqueceu a sua senha? Clique ao lado para atualizar.'
						showIcon
						type='error'
						closable
						action={
							<Button size='small' danger onClick={showModal}>
								Atualizar senha
							</Button>
						}
						onClose={() => {
							const code = 50;
							setSession({
								code,
							});
						}}
					/>
				) : (
					''
				)}
				{session.code === 10 ? (
					<Alert
						message='As senha estão diferentes. Por favor digite novamente.'
						showIcon
						type='warning'
						closable
						onClose={() => {
							const code = 60;
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
