/// Polly /////////////
export const speakText = (text) => {
	if ('speechSynthesis' in window) {
		const utterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(utterance);
		return {
			output: ` `
		};
	} else {
		return {
			output: 'Speech synthesis is not supported on this device.'
		};
	}
};
