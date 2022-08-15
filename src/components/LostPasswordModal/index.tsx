import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Modal, Input, Button } from 'antd';
import { MdOutlineEmail } from 'react-icons/md';
import { UserContext } from '../../contexts/UserContext';
import tools from './../../util/tools';

interface LostPasswordProps {
	isOpen: boolean;
}

export default function LostPaswordModal({ isOpen }: LostPasswordProps) {
	const { setIsModalVisible, urlBackendApi } = useContext(UserContext);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');
	const [email, setEmail] = useState('');
	const [textInitialModal, setTextInitialModal] = useState(true);

	const router = useRouter();

	useEffect(() => {
		if (textInitialModal === true)
			setModalText(
				'Não se preocupe, enviaremos para seu email uma nova senha. Assim você poderá continuar acessando o painel de sua conta.'
			);
	}, [textInitialModal]);

	const handleEnviar = async () => {
		const passwordnew = tools.getPassword(6);
		setModalText('Enviando senha para ' + email);
		setConfirmLoading(true);
		setTextInitialModal(false);

		//TODO: post com email e senha para salvar em banco e enviar email
		//no back end tem que atualizar o banco e envia email

		const response = await fetch(`${urlBackendApi}/user/recoverypassword`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email,
				passwordnew,
			}),
		});

		const resp = await response.json();
		console.log(resp);

		if (resp.status) {
			setModalText('Senha enviada com sucesso! Confira em seu e-amil.');
			setConfirmLoading(false);
		} else {
			setModalText('Falha no envio, tente novamente.');
			setConfirmLoading(false);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setConfirmLoading(false);
		setTextInitialModal(true);
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
				destroyOnClose
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
