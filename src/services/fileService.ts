const API = process.env.BACKEND_API;
const findSlug = async (fileSlug: string) => {
	const responseSlug = await fetch(`${API}/medias/slug/${fileSlug}`);

	//return responseSlug.status === 200 ? true : false;
	return await responseSlug.json();
};

const defaultFuntions = { findSlug };

export default defaultFuntions;
