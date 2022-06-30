import { database } from '@src/adapters/database';

export const findFiles = async () => {
	const categories = await database.category.findMany();

	return categories;
};

export default { findFiles };
