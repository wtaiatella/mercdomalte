import { useContext, useEffect, useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { MdOutlineEmail } from 'react-icons/md';
import { UserContext } from '../../contexts/UserContext';
import tools from './../../util/tools';

interface LostPasswordProps {
	isOpen: boolean;
}

export default function LostPaswordModal({ isOpen }: LostPasswordProps) {
	const { setIsModalVisible } = useContext(UserContext);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');
	const [email, setEmail] = useState('Content of the modal');

	useEffect(() => {
		if (confirmLoading === false)
			setModalText(
				'Não se preocupe, enviaremos para seu email uma nova senha. Assim você poderá continuar acessando o painel de sua conta.'
			);
	}, [confirmLoading]);

	const handleEnviar = () => {
		setModalText('Enviando para ' + email);
		const newPassword = tools.getPassword(6);

		setConfirmLoading(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setConfirmLoading(false);
	};

	return (
		<>
			<Modal
				title='Esqueceu a sua senha?'
				visible={isOpen}
				onCancel={handleCancel}
				onOk={handleEnviar}
				confirmLoading={confirmLoading}
				okText='Enviar'
			>
				<p>{modalText}</p>
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
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Item>
			</Modal>
		</>
	);
}
