import { connection } from 'mongoose';
import { expose } from 'threads/worker';
import DB from './database';
import { ProductModel } from './product';

async function processData() {
	try {
		await new DB().init();
		const update = await ProductModel.create({
			productID: 2,
			title: 'Worker',
		});
		console.log('Worker update: ', update);
	} catch (error) {
		throw error;
	} finally {
		try {
			await connection.close();
		} catch (error) {
			console.error('Connection already closed!');
		}
	}
}

expose(processData);
