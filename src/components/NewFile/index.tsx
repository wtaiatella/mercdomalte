import Head from 'next/head';
import { ReactNode, useEffect, useState, useCallback, useContext } from 'react';

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
import { s3getUploadSignedUrl } from '../../services/awsService';
import { RcFile } from 'antd/lib/upload';
import tools from './../../util/tools';
import fileService from './../../services/fileService';
import { UserContext } from '../../contexts/UserContext';

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
	const { urlBackendApi } = useContext(UserContext);

	const { Dragger } = Upload;

	const handleFileDroped = async (fileDroped: RcFile) => {
		//TODO: Generate SLUG
		const fileDropedSlug = tools.getFileSlug(fileDroped.name);
		console.log(`fileDropedSlug = ${fileDropedSlug}`);
		//
		//TODO: Check if exists this file slug in DataBase
		const dropedFileExists = await fileService.findSlug(
			fileDropedSlug,
			urlBackendApi
		);
		console.log(`dropedFileExists = ${dropedFileExists}`);
		//
		if (!dropedFileExists) {
			setFileUploaded(fileDroped);
			const fetchS3SignedUrl = await s3getUploadSignedUrl(
				fileDroped.name,
				urlBackendApi
			);
			console.log('retorno do fecht = ' + fetchS3SignedUrl);

			setS3UploadSignedUrl(`${fetchS3SignedUrl}`);

			const fileDataDroped = {
				name: fileDroped.name,
				slug: fileDropedSlug,
				size: fileDroped.size,
				type: fileDroped.type,
				icon: 'SearchOutlined',
			};
			setFileData(fileDataDroped);
		} else {
			message.error(
				`O arquivo ${fileDroped.name} ja existe em nossa base de dados.`
			);
		}
	};

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
				console.log(
					'deu certo drag and drop do arquivo ' + info.file.name
				);

				const fileDroped: RcFile = info.file.originFileObj;
				handleFileDroped(fileDroped);
			} else if (status === 'removed') {
				setFileData(undefined);
				setFileUploaded(undefined);
			} else if (status === 'error') {
				//message.error(`Falha no upload do arquivo ${info.file.name}.`);
				//console.log('deu erro');

				const fileDroped: RcFile = info.file.originFileObj;
				handleFileDroped(fileDroped);
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
