import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { Form, Input, Button, Checkbox, message, Alert } from 'antd';

import { LockOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';

import LostPaswordModal from '../../components/LostPasswordModal';
import { Title } from '../../components/Common/Title';
import { TextBlock } from '../../components/Common/TextBlock';

import { Container } from './styles';

import { UserContext } from '../../contexts/UserContext';

export default function LoginForm() {
	const { isModalVisible, setIsModalVisible, session, setSession } =
		useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		const code = 0;
		setSession({
			code,
		});
	}, []);
	const showModal = () => {
		setIsModalVisible(true);
	};

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values);
		const { email, password } = values;

		const response = await fetch('http://localhost:5500/auth/login', {
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
			const { name, accessToken } = resp.data;
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
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Container>
				<Title>Identificação do usuário</Title>
				<TextBlock>
					Faça o seu login e tenha acesso a todos os documentos do
					site.
				</TextBlock>
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
							Log in
						</Button>
						<Link href='/register'>Registre agora!</Link>
					</Form.Item>
				</Form>
				{session.code === 404 ? (
					<Alert
						message='Usuario não encontrado'
						showIcon
						type='info'
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
							const code = 0;
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
						message='Sua senha está incorreta, digite novamente ou clique ao lado para atualizar.'
						showIcon
						type='warning'
						closable
						action={
							<button onClick={showModal}>
								Atualizar senha.
							</button>
						}
						onClose={() => {
							const code = 0;
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
