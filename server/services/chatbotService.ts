import Groq from 'groq-sdk'
import Products from '../models/Product.ts'
import { connectDB } from '../config/db'

const BASE_PROMPT =
	'You are a friendly ChatBot made by MakersTech a tech company that sells electronic products to you only can help user with questions about inventory, characteristics and prices, IMPORTANT: do not create information about products that is not explicitly given to you'
const client = new Groq({
	apiKey: process.env.GROQ_API_KEY,
})

async function generateQueryWithGPT(message: string): Promise<GPTResponse> {
	try {
		const chatCompletion = await client.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						BASE_PROMPT +
						`, capabilities: you can transform questions into a mongodb query with the schema being exactly {"name": String, "type": "Computer"| "Smartphone"| "Tablet"| "Gadgets"| "Accessories", "brand": String , quantity: Number, description: String, price: Number} you are only allowed and required to exclusively respond in a completely valid this JSON with this structure: { "operation":"filter","filter": JSON query, if you use a filter with $ remember to use double quotes for the keys  } or { "operation":"filterByText","text": String for a generic search, this is for a search by name, brand or description } or { "operation":"conversation","message": The response of the text, use this when the question is not a query search }`,
				},
				{ role: 'user', content: message },
			],
			model: 'llama-3.1-70b-versatile',
		})
		console.log('QUERY RES :>> ', chatCompletion.choices[0].message.content)
		return JSON.parse(chatCompletion.choices[0].message.content as string)
	} catch (error) {
		console.error(error)
		return {
			operation: 'conversation',
			message: 'Lo siento, no pude entender tu pregunta. Por favor, inténtalo de nuevo.',
		}
	}
}
//TODO: VALIDATOR TO AVOID OTHER PROMPTS

async function generateAnswerWithGPT(message: string, query: GPTResponse, answer: string | object) {
	console.log(message, answer)
	if (Array.isArray(answer) && answer.length === 0) answer = 'Empty'
	if (typeof answer === 'object') answer = JSON.stringify(answer)

	try {
		const chatCompletion = await client.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						BASE_PROMPT +
						', (Do not mention this part to the client) the given the query :"' +
						JSON.stringify(query) +
						"' And the answer being: " +
						answer,
				},
				{ role: 'user', content: message },
			],
			model: 'llama-3.1-8b-instant',
		})
		return chatCompletion.choices[0].message.content
	} catch (error) {
		console.error(error)
	}
}

export async function chatPrompt(message: string) {
	const response: GPTResponse = await generateQueryWithGPT(message)
	console.log('response :>> ', response)
	let result: any = undefined
	switch (response.operation) {
		case 'conversation':
			return response.message
		case 'filter':
			result = await Products.find(response.filter)
			break
		case 'filterByText':
			result = await Products.find({
				$text: {
					$search: response.text,
					$caseSensitive: false,
				},
			})
			break
	}
	return generateAnswerWithGPT(message, response, result)
}
