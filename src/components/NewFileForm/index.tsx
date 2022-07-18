import { Form, Input, Button } from 'antd';

import { Container } from './styles';

import { ReactNode, useState, useEffect } from 'react';

import { RcFile } from 'antd/lib/upload';
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
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		console.log('useeffect');
		const fetchCategories = async () => {
			const dataCategories = await fetch(
				`http://localhost:5500/mediascategories`
			);
			const jsonCategories = await dataCategories.json();
			setCategories(jsonCategories);

			console.log(`Aqui estão as medias do site`);
			console.log(jsonCategories);
		};
	}, []);

	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values);
		const addFile = {
			title: values.fileTitle,
			name: fileData.name,
			slug: fileData.slug,
			icon: 'SearchOutlined',
			type: fileData.type,
			size: fileData.size,
			categoryId: 'cl5quwha10013a8qi64lt7cpz',
		};

		const jsonAddFile = JSON.stringify(addFile);
		console.log(jsonAddFile);

		fetch('http://localhost:5500/medias', {
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
