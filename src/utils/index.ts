export const getNumberOfPages = (numberOfItems: number, itemsPerPage: number): number => {
	let numberOfPages = 0;

	for(let i = 0; i < numberOfItems; i++) {
		if((numberOfItems + i )% itemsPerPage === 0) {
			numberOfPages++;
		};
	};

	return numberOfPages;
};
