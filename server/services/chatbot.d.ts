type findResponse = {
	operation: 'filter'
	filter: any
}

type findTextResponse = {
	operation: 'filterByText'
	text: string
}
type conversationResponse = {
	operation: 'conversation'
	message: string
}
type GPTResponse = findResponse | findTextResponse | conversationResponse
