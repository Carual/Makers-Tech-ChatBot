interface Message {
	sender?: 'user' | 'bot'
	message: string
	timestamp: number
}

type Chat = Message[]

interface response {
	message: Message
}
