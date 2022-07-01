import { database } from '@src/adapters/database';

export const findMedias = async () => {
	const medias = await database.media.findMany();

	return medias;
};

export default { findMedias };
