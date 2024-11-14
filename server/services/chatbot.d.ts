type queryCreator = {
	operation: 'find' | 'count'
	filters: {
		[key: string]: 'string' | 'number'
	}
}
