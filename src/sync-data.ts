import { connection } from 'mongoose';
import 'reflect-metadata';
import { spawn, Thread, Worker } from 'threads';
import DB from './database';
import { ProductModel } from './product';

async function startWorker(workerPath: string) {
	try {
		var worker = await spawn(
			new Worker(workerPath, {
				resourceLimits: {
					maxOldGenerationSizeMb: 32_768,
				},
			}),
			{ timeout: 30_000 }
		);
		const workerResult = await worker();
		console.log(workerResult);
	} catch (error) {
		console.error(error);
	} finally {
		try {
			await Thread.terminate(worker);
		} catch (error) {
			console.error(error);
		}
	}
}

async function run() {
	try {
		await new DB().init();
		const update = await ProductModel.create({
			productID: 1,
			title: 'Master',
		});
		console.log('Master update: ', update);
		await startWorker('./worker');
	} catch (error) {
		console.error(error);
	} finally {
		try {
			console.log('Closing MongoDB connection master..');
			connection.close();
		} catch (error) {
			console.error('MongoDB connection already closed', error);
		}
	}
}

run();
