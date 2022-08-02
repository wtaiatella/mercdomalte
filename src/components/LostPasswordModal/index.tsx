import { useContext } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { MdOutlineEmail } from 'react-icons/md';
import { UserContext } from '../../contexts/UserContext';

interface LostPasswordProps {
	isOpen: boolean;
}

export default function LostPaswordModal({ isOpen }: LostPasswordProps) {
	const { setIsModalVisible } = useContext(UserContext);

	const handleEnviar = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Modal
				title='Esqueceu a sua senha?'
				visible={isOpen}
				onCancel={handleCancel}
				footer={[]}
			>
				<p>
					Não se preocupe, enviaremos para seu email uma nova senha.
					Assim você poderá continuar acesando o painel de sua conta.
				</p>
				<p></p>
				<Form
					name='lostPassword'
					className='lostpassword-form'
					initialValues={{ remember: false }}
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

					<Form.Item wrapperCol={{ offset: 5 }}>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
							onClick={handleEnviar}
						>
							Enviar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
