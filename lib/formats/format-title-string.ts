export function FormatTitleString(inputString: string): string {
	if (!inputString || inputString.length === 0) {
		return inputString;
	}

	const words = inputString.split(' ');
	const capitalizedWords = words.map((word) => {
		if (word.length === 0) {
			return word;
		}
		const firstLetter = word[0].toUpperCase();
		const restOfWord = word.slice(1).toLowerCase();
		return firstLetter + restOfWord;
	});

	return capitalizedWords.join(' ');
}
