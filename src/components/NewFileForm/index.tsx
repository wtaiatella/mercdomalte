import { Form, Input, Button, message } from 'antd';

import { Container } from './styles';

import { ReactNode, useState, useEffect, useContext } from 'react';

import { RcFile } from 'antd/lib/upload';
import { UserContext } from '../../contexts/UserContext';
interface fileDataProp {
	title?: string;
	name: string;
	slug?: string;
	size: number;
	type: string;
	icon: ReactNode;
}

export default function NewFileForm({
	fileData,
	fileUploaded,
	s3UploadSignedUrl,
}: {
	fileData: fileDataProp;
	fileUploaded: RcFile;
	s3UploadSignedUrl: string;
}) {
	const { urlBackendApi, session } = useContext(UserContext);
	const { email } = session;

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values);
		const addFile = {
			title: values.fileTitle,
			name: fileData.name,
			slug: fileData.slug,
			icon: 'SearchOutlined',
			type: fileData.type,
			size: fileData.size,
			email: email,
		};

		const jsonAddFile = JSON.stringify(addFile);
		console.log(jsonAddFile);

		fetch(`${urlBackendApi}/file`, {
			method: 'POST',
			body: JSON.stringify(addFile),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((err) => console.log(err));

		console.log('url recebida');
		console.log(s3UploadSignedUrl.slice(1, -1));
		//url used for put file in AWS
		const response = await fetch(s3UploadSignedUrl.slice(1, -1), {
			method: 'PUT',
			body: fileUploaded,
		});

		console.log(response);

		if (response.status === 200) {
			message.success('Upload realizado com succeso, Obrigado!', 10);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Container>
				<Form
					name='newFileForm'
					className='register-form'
					initialValues={{ remember: false }}
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					size='large'
				>
					<Form.Item
						label='Título'
						name='fileTitle'
						rules={[
							{
								type: 'string',
								message:
									'Por favor, digite o título do arquivo',
							},
						]}
					>
						<Input allowClear={true} />
					</Form.Item>

					<Form.Item label='Nome' name='fileName'>
						<p>{fileData.name}</p>
					</Form.Item>

					<Form.Item label='Tamanho' name='fileSize'>
						<p>{fileData.size}</p>
					</Form.Item>
					<Form.Item label='Tipo' name='fileType'>
						<p>{fileData.type}</p>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 5 }}>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Confirmar upload
						</Button>
					</Form.Item>
				</Form>
			</Container>
		</>
	);
}
