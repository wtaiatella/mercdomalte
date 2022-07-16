import Head from 'next/head';
import { ReactNode, useEffect, useState, useCallback } from 'react';

import { UploadProps, Form } from 'antd';
import { message, Upload, Button } from 'antd';
import {
	ConsoleSqlOutlined,
	InboxOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import { Container } from './styles';

import NewFileForm from '../NewFileForm';
import { s3upload } from '../../services/aws';
import { RcFile } from 'antd/lib/upload';

const NewFile = () => {
	const [categories, setCategories] = useState([]);
	const [s3getSignedUrl, setS3getSignedUrl] = useState('');

	useEffect(() => {
		console.log('useeffect');
		/*const fetchCategories = async () => {
			const dataCategories = await fetch(
				`http://localhost:5000/mediasCategories`
			);
			const jsonCategories = await dataCategories.json();
			setCategories(jsonCategories);

			console.log(`Aqui estão as medias do site`);
			console.log(jsonCategories);
		};*/

		const fetchS3getSignedUrl = async () => {
			const dataS3getSignedUrl = await fetch(
				'http://localhost:5000/uploadurl'
			);
			console.log(dataS3getSignedUrl);
			const textS3getSignedUrl = await dataS3getSignedUrl.text();

			setS3getSignedUrl(textS3getSignedUrl);

			console.log(`Aqui está a S3getSignedUrl`);
			console.log(textS3getSignedUrl);
		};

		fetchS3getSignedUrl().catch(console.error);
	}, []);
	interface fileDataProp {
		name: string;
		slug?: string;
		size: number;
		type: string;
		icon: ReactNode;
	}

	const [fileData, setFileData] = useState<fileDataProp>();
	const [fileUploaded, setFileUploaded] = useState<RcFile>();

	const { Dragger } = Upload;

	const props: UploadProps = {
		name: 'file',
		multiple: false,
		maxCount: 1,
		//action: s3getSignedUrl,

		onChange(info) {
			const { status } = info.file;
			console.log(info.file.status);
			console.log(info);
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);
				setFileData({
					name: info.file.name,
					slug: info.file.name,
					size: info.file.size,
					type: info.file.type,
					icon: <SearchOutlined />,
				});

				console.log('deu certo drag and drop ' + info.file.name);
				console.log(info);
				console.log(info.file.originFileObj);

				const arquivo: RcFile = info.file.originFileObj;

				setFileUploaded(arquivo);

				const fetchS3file = async () => {
					const uploadParams = {
						Bucket: 'mercdomalte-files',
						//Key: fileUploaded.name,
						Body: fileUploaded,
					};
					const response = await fetch(s3getSignedUrl, {
						method: 'PUT',
						body: uploadParams.Body,
					});
				};

				fetchS3file().catch(console.error);
			} else if (status === 'removed') {
				setFileData(undefined);
				setFileUploaded(undefined);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);

				console.log('deu erro');
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	function handleUploadClick(event) {
		event.preventDefault();
		console.log('Entrada do Upload pelo botão');
		console.log(event);
		console.log(event.target.form[0].files[0]);
		var files = document.getElementById('fileUpload').files;
		console.log('Upload pelo botão');
		console.log(files, typeof files);
		console.log(files[0], typeof files[0]);

		const arquivo: File = event.target.form[0].files[0];
		if (arquivo) {
			s3upload(arquivo);
		} else {
			alert('Escolha um arquivo!');
		}
	}

	return (
		<>
			<Head>
				<title>MdM - Novo Arquivo</title>
			</Head>
			<Container>
				<h1>Novo arquivo1</h1>

				<Dragger {...props}>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>
						Click or drag file to this area to upload
					</p>
					<p className='ant-upload-hint'>
						Support for a single or bulk upload. Strictly prohibit
						from uploading company data or other band files
					</p>
				</Dragger>

				{fileData ? <NewFileForm fileData={fileData} /> : <></>}

				<form action='' id='meu-form'>
					<div>
						<input type='file' id='fileUpload' />
					</div>
					<div>
						<button onClick={handleUploadClick}>Submit</button>
					</div>
				</form>
			</Container>
		</>
	);
};

export default NewFile;
