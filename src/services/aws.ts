import {
	bucketName,
	bucketRegion,
	IdentityPoolId,
} from './../services/constants';

var AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'us-east-1:296f99e0-15e9-43b8-b779-0691cb87c545',
	}),
});

export const s3 = new AWS.S3({
	apiVersion: 'latest',
	params: { Bucket: 'mercdomalte-files' },
});

console.log('credenciais iniciais');
console.log(IdentityPoolId);
console.log(AWS.config.credentials);
console.log(s3);
