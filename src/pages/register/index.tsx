import Head from 'next/head';
import { useContext } from 'react';

import { Form, Input, Button } from 'antd';
import LostPaswordModal from '../lostpasswordmodal';
import { UserContext } from '../../contexts/UserContext';

import { Container, Content } from './styles';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';

export default function Register() {
	const { isModalVisible, setIsModalVisible } = useContext(UserContext);
	const showModal = () => {
		setIsModalVisible(true);
	};

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
				<Content>
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
							/>
						</Form.Item>

						<Form.Item
							label='Senha'
							name='passwordMain'
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
							/>
						</Form.Item>

						<Form.Item
							wrapperCol={{ offset: 5 }}
							name='passwordRepeate'
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
							<Button onClick={showModal}>
								E-mail ja cadastrado! Perdeu a senha? Clique
								aqui.
							</Button>
						</Form.Item>
					</Form>
				</Content>
			</Container>

			<LostPaswordModal isOpen={isModalVisible} />
		</>
	);
}
