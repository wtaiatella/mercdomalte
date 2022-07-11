import { API } from './constants';

const find = async (categoryId: string | undefined) => {
	const responseCategory = await fetch(`${API}/categories/${categoryId}`);
	const categoryObject = await responseCategory.json();

	const resposeProducts = await fetch(
		`${API}/categories/${categoryId}/products`
	);
	const productObject = await resposeProducts.json();

	return {
		...categoryObject,
		products: productObject,
	};
};

const defaultFuntions = { find };

export default defaultFuntions;
