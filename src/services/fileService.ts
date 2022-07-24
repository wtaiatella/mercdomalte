import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const findSlug = async (fileSlug: string, urlBackendApi: string) => {
	const responseSlug = await fetch(
		`${urlBackendApi}/medias/slug/${fileSlug}`
	);

	//return responseSlug.status === 200 ? true : false;
	return await responseSlug.json();
};

const defaultFuntions = { findSlug };

export default defaultFuntions;
