import Groq from 'groq-sdk'

const client = new Groq({
	apiKey: process.env.GROQ_API_KEY,
})

async function generateQueryWithGPT(question: string) {
	try {
		const chatCompletion = await client.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: `You are a chatbot to help users ask questions about products in a database transform this question into a mongodb query with the schema being {name: String, type: String, brand: String, quantity: Number, description: String, price: Number} only respond in this format:{operation: 'find' | 'count' | 'conversation',filters: any} if the question is not about products in the database respond in this format: {operation: 'conversation', filters: 'string'} 'string' is the answer to the question.`,
				},
				{ role: 'user', content: question },
			],
			model: 'llama-3.1-8b-instant',
		})
		console.log('object :>> ', chatCompletion.choices[0].message.content)
		return JSON.parse(chatCompletion.choices[0].message.content as string)
	} catch (error) {
		return {
			operation: 'conversation',
			filters: 'Lo siento, no pude entender tu pregunta. Por favor, inténtalo de nuevo.',
		}
	}
}

console.log(await generateQueryWithGPT('Cuantos computadores hay?'))
