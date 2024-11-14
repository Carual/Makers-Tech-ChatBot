import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.ts'
import Products from './models/Product.ts'

const app = express()
await connectDB()
app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
)

app.post('/api/chat', (req, res) => {
	const chat: Chat = req.body
	console.log(chat)
	res.status(200).json({ sender: 'bot', message: 'hola', timestamp: Date.now() })
})

app.listen(3001, () => {
	console.log('Server started on port 3001')
})
