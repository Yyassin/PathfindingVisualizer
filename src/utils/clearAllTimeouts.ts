/**
 * 
 * @param firstId 
 * @param lastId 
 */
const clearAllTimeouts = (firstId: number, lastId: number) => {
	let currId = firstId;
	while (currId !== lastId) {
		window.clearTimeout(++currId);
	}
};

export { clearAllTimeouts };
