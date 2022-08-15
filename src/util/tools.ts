function getFileSlug(fileName: string) {
	return fileName
		.toLowerCase()
		.replace(/[âäáàã]+/g, 'a')
		.replace(/[éêë]+/g, 'e')
		.replace(/[í]+/g, 'i')
		.replace(/[óòõôö]+/g, 'o')
		.replace(/[ü]+/g, 'u')
		.replace(/[ýÿ]+/g, 'y')
		.replace(/[ñ]+/g, 'n') // Special Characters #7
		.replace(/[ç]+/g, 'c') // Special Characters #8
		.replace(/[%]+/g, 'pct') // Special Characters #12
		.replace(/[_]+/g, '-') // Remove all non-word chars
		.replace(/[^\w\-]+/g, '-') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

function getPassword(tamanho: number) {
	var stringAleatoria = '';
	var caracteres =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < tamanho; i++) {
		stringAleatoria += caracteres.charAt(
			Math.floor(Math.random() * caracteres.length)
		);
	}
	return stringAleatoria;
}

const defaultFuntions = { getFileSlug, getPassword };

export default defaultFuntions;
