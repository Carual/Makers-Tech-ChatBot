import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	name: String,
	type: String,
	brand: String,
	quantity: Number,
	description: String,
	price: Number,
})

const model = mongoose.model('products', productSchema)

export default model
