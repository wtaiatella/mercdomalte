import 'dotenv/config';

import express from 'express';
import { Request, Response } from 'express';

import logger from './adapters/logger';

import { find } from '@src/services/categoryService';
import categoryService from '@src/services/categoryService';
import productService from '@src/services/productService';

console.log(process.env.AWARI);
const app = express();

app.get('/categories', async (req: Request, res: Response) => {
	const categories = await find();
	logger.info(`aqui estão as categorias: ${categories}`);
	res.json(categories);
});

app.get('/categories/:id', async (req: Request, res: Response) => {
	const categoryId = req.params.id;

	const category = await categoryService.findOne(categoryId);

	res.json(category);
});

app.get('/categories/:id/products', async (req: Request, res: Response) => {
	const categoryId = req.params.id;
	logger.debug(`categoryId = ${categoryId}`);
	const products = await productService.find(categoryId);
	res.json(products);
});

app.get('/products/:id', async (req: Request, res: Response) => {
	const productId = req.params.id;
	logger.info({ productId });

	const product = await productService.findOne(productId);
	logger.info({ product });

	res.json(product);
});

export default app;
