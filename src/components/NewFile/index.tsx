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
import { s3getSignedUrl } from '../../services/aws';
import { RcFile } from 'antd/lib/upload';

const NewFile = () => {
	interface fileDataProp {
		name: string;
		slug?: string;
		size: number;
		type: string;
		icon: string;
	}

	const [fileData, setFileData] = useState<fileDataProp>();
	const [fileUploaded, setFileUploaded] = useState<RcFile>();
	const [s3UploadSignedUrl, setS3UploadSignedUrl] = useState<string>();

	const { Dragger } = Upload;

	const props: UploadProps = {
		name: 'file',
		multiple: false,
		maxCount: 1,

		async onChange(info) {
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

				console.log(
					'deu certo drag and drop do arquivo ' + info.file.name
				);
				console.log(info.file.originFileObj);

				const fileDroped: RcFile = info.file.originFileObj;

				setFileUploaded(fileDroped);
				//TODO: Generate SLUG
				//TODO: Check if exists this file slug in DataBase

				const fetchS3SignedUrl = await s3getSignedUrl(fileDroped.name);
				console.log('retorno do fecht = ' + fetchS3SignedUrl);

				setS3UploadSignedUrl(`${fetchS3SignedUrl}`);

				const fileDataDroped = {
					name: fileDroped.name,
					slug: fileDroped.name,
					size: fileDroped.size,
					type: fileDroped.type,
					icon: 'SearchOutlined',
				};
				setFileData(fileDataDroped);
			} else if (status === 'removed') {
				setFileData(undefined);
				setFileUploaded(undefined);
			} else if (status === 'error') {
				message.error(`Falha no upload do arquivo ${info.file.name}.`);
				console.log('deu erro');
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

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

				{fileData ? (
					<NewFileForm
						fileData={fileData}
						fileUploaded={fileUploaded}
						s3UploadSignedUrl={s3UploadSignedUrl}
					/>
				) : (
					<></>
				)}
			</Container>
		</>
	);
};

export default NewFile;
