import { connect } from 'mongoose';

export default class DB {
	constructor() {}

	async init() {
		try {
			await connect('mongodb://localhost:27017');
			console.log('MongoDB Connected');
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
