import Groq from 'groq-sdk'
import { connectDB } from '../config/db.ts'
import Product from '../models/Product.ts'

const BASE_PROMPT =
	'You are a friendly ChatBot made by MakersTech a tech company that sells electronic products to you only can help user with questions about inventory, characteristics and prices'
const client = new Groq({
	apiKey: process.env.GROQ_API_KEY,
})

async function generateQueryWithGPT(message: string) {
	try {
		const chatCompletion = await client.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						BASE_PROMPT +
						`, capabilities: you can transform questions into a mongodb query with the schema being exactly {name: String, type: String, brand: String, quantity: Number, description: String, price: Number} you are only allowed and required to exclusively respond in a completely valid this JSON (use double quotes) with format with this structure:{"operation": 'find' | 'count' | 'conversation',"filters": any} if the question is not about products in the database respond in this format: {"operation": "conversation", "filters": "string"} 'string' is the answer to the question.`,
				},
				{ role: 'user', content: message },
			],
			model: 'llama-3.1-8b-instant',
		})
		console.log('object :>> ', chatCompletion.choices[0].message.content)
		return JSON.parse(chatCompletion.choices[0].message.content as string)
	} catch (error) {
		console.error(error)
		return {
			operation: 'conversation',
			filters: 'Lo siento, no pude entender tu pregunta. Por favor, inténtalo de nuevo.',
		}
	}
}
//TODO: VALIDATOR TO AVOID OTHER PROMPTS

export async function chatPrompt(message: string) {
	const response: GPTResponse = await generateQueryWithGPT(message)
	let ret = typeof response.filters === 'string' ? response.filters : JSON.stringify(response)
	console.log('ret :>> ', ret)
	return ret //response.filters
	//switch (response.operation) {
	//	default:
	//		return response.filters
	//	case 'find':
	//		return await Product.find(response.filters)
	//	case 'count':
	//		return await Product.countDocuments(response.filters)
	//}
}
