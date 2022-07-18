const s3getSignedUrl = async (fileName: string) => {
	console.log(`Function s3getSignedUrl with file.name = ${fileName}`);

	const resposta = await fetch(`http://localhost:5500/uploadurl`, {
		method: 'POST',
		body: `{"fileName": "${fileName}"}`,
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	})
		.then((response) => response.text())
		.catch((err) => console.log(err));
	console.log(resposta);

	if (resposta) return resposta;
	//const categoryObject = await respS3SignedUrl.text();
};

export { s3getSignedUrl };
