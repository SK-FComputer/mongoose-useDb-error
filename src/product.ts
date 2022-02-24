import { getModelForClass, prop } from '@typegoose/typegoose';
import { connection, Types } from 'mongoose';

class Product {
	_id: Types.ObjectId;

	@prop({ required: true, select: false })
	title: string;

	@prop()
	productID: number;
}

const productDb = connection.useDb('mongoose-error', { useCache: true });

const ProductModel = getModelForClass(Product, {
	existingConnection: productDb,
});

export { Product, ProductModel };
