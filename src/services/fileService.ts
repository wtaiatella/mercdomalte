import { API } from './constants';

const findSlug = async (fileSlug: string) => {
	const responseSlug = await fetch(
		`http://localhost:5500/medias/slug/${fileSlug}`
	);

	//return responseSlug.status === 200 ? true : false;
	return await responseSlug.json();
};

const defaultFuntions = { findSlug };

export default defaultFuntions;
