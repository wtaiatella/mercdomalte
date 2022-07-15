const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');
const {
	fromCognitoIdentityPool,
} = require('@aws-sdk/credential-provider-cognito-identity');
const {
	S3Client,
	PutObjectCommand,
	ListObjectsCommand,
	DeleteObjectCommand,
	DeleteObjectsCommand,
} = require('@aws-sdk/client-s3');

export const s3upload = async (file) => {
	const REGION = 'us-east-1';
	const IDENTITY_POOL_ID = 'us-east-1:296f99e0-15e9-43b8-b779-0691cb87c545';
	const BUCKET_NAME = 'mercdomalte-files';

	const s3 = new S3Client({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			client: new CognitoIdentityClient({ region: REGION }),
			identityPoolId: IDENTITY_POOL_ID,
		}),
	});

	console.log('credenciais iniciais');
	console.log(`IDENTITY_POOL_ID = ${IDENTITY_POOL_ID}`);
	console.log(s3.credentials);
	console.log(s3);

	console.log('Função s3upload');
	//const file = files[0];
	console.log(file);

	const fileName = file.name;
	const Key = fileName;
	const uploadParams = {
		Bucket: BUCKET_NAME,
		Key: Key,
		Body: file,
	};
	try {
		const data = await s3.send(new PutObjectCommand(uploadParams));
		alert('Successfully uploaded photo.');
	} catch (err) {
		return alert('There was an error uploading your photo: ' + err.message);
	}
};
