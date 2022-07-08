import { Form, Input, Button } from 'antd';

import { Container } from './styles';

import { ReactNode } from 'react';

interface fileDataProp {
	title?: string;
	name: string;
	slug?: string;
	size: number;
	type: string;
	icon: ReactNode;
}

export default function NewFileForm({ fileData }: { fileData: fileDataProp }) {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		const addFile = {
			title: values.fileTitle,
			name: fileData.name,
			slug: fileData.slug,
			icon: 'SearchOutlined',
			type: fileData.type,
			size: fileData.size,
			categoryId: 'cl52mbnm50018m0qiypvkp9l7',
		};

		const jsonAddFile = JSON.stringify(addFile);
		console.log(jsonAddFile);

		fetch('http://localhost:5000/medias', {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(addFile),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((err) => console.log(err));
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
