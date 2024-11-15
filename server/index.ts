import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.ts'
import { chatPrompt } from './services/chatbotService.ts'
import Products from './models/Product.ts'

const app = express()
await connectDB()

app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
)

app.post('/api/chat', async (req, res) => {
	const chat: Chat = req.body?.chat
	const message = chat[chat.length - 1].message
	console.log('message :>> ', message)
	res.status(200).json({ sender: 'bot', message: await chatPrompt(message), timestamp: Date.now() })
})

app.listen(3001, () => {
	console.log('Server started on port 3001')
})
