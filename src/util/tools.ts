function fileSlug(fileName) {
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

const defaultFuntions = { fileSlug };

export default defaultFuntions;
