import Groq from 'groq-sdk'

const client = new Groq({
	apiKey: process.env.GROQ_API_KEY,
})

async function generateQueryWithGPT(question: string) {
	const chatCompletion = await client.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `Transform this question into a mongodb query with the schema being {name: String, type: String, brand: String, quantity: Number, description: String, price: Number} only respond in this format:{operation: 'find' | 'count',filters: any`,
			},
			{ role: 'user', content: question },
		],
		model: 'llama-3.1-8b-instant',
	})
	return chatCompletion.choices[0].message.content
}




console.log(await generateQueryWithGPT('Cuantos productos hay en la base de datos de marca Dell?'))
