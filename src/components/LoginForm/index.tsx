import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';

import { LockOutlined } from '@ant-design/icons';
import { MdOutlineEmail } from 'react-icons/md';

import LostPaswordModal from '../../components/LostPasswordModal';
import { Container } from './styles';
import { UserContext } from '../../contexts/UserContext';

export default function LoginForm() {
	const { isModalVisible, setIsModalVisible } = useContext(UserContext);
	const router = useRouter();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		router.push('/myaccount');
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
		router.push('/myaccount');
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

						<Button
							onClick={showModal}
							className='login-form-forgot'
						>
							Esqueceu a senha?
						</Button>
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
			</Container>

			<LostPaswordModal isOpen={isModalVisible} />
		</>
	);
}
