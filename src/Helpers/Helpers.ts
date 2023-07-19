export const formatDate = (dateString: string | undefined): string => {
	if (!dateString) return ''
	const date = new Date(dateString)
	const year = date.getUTCFullYear()
	const month = String(date.getUTCMonth() + 1).padStart(2, '0')
	const day = String(date.getUTCDate()).padStart(2, '0')

	return `${year}.${month}.${day}`
}

export const formatStrLogo = (str: string[]): string => {
	let initials = ''
	if (str) {
		for (let i = 0; i < str.length; i++) {
			const word = str[i]
			initials += word[0]
		}
	}
	return initials.toUpperCase()
}
