import Head from 'next/head';
import { Container, Content } from './styles';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';
import Link from 'next/link';

export default function Login() {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Head>
				<title>MdM - Login</title>
			</Head>
			<Container>
				<Content>
					<h1>Identificação do usuário</h1>
					<p>
						Faça o seu login e tenha acesso a todos os documentos do
						site.
					</p>
					<Form
						name='login'
						className='login-form'
						initialValues={{ remember: true }}
						labelCol={{ span: 5 }}
						wrapperCol={{ span: 16 }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
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
							/>
						</Form.Item>

						<Form.Item
							className='formOptions'
							wrapperCol={{ offset: 5 }}
						>
							<Form.Item
								name='remember'
								valuePropName='checked'
								noStyle
							>
								<Checkbox>Lembrar-me</Checkbox>
							</Form.Item>

							<Link href=''>
								<a className='login-form-forgot' href=''>
									Esqueceu o Password?
								</a>
							</Link>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 5 }}>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								Log in
							</Button>
							<a href=''>Registre agora!</a>
						</Form.Item>
					</Form>

					<span>
						Ao continuar com o acesso, você concorda com a nossa
						política de privacidade
					</span>
				</Content>
			</Container>
		</>
	);
}
