export const generatePagination = (page: number, totalPages: number): (number | string)[] => {
	const pages: (number | string)[] = [];
	const delta = 1;
	if (page > delta + 2) {
		pages.push(1, '...');
	} else {
		for (let i = 1; i <= Math.min(delta + 2, totalPages); i++) {
			pages.push(i);
		}
	}

	for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
		if (!pages.includes(i)) pages.push(i);
	}

	if (page < totalPages - delta - 1) {
		pages.push('...', totalPages);
	} else {
		for (let i = totalPages - delta - 1; i <= totalPages; i++) {
			if (i > 1 && !pages.includes(i)) pages.push(i);
		}
	}

	return pages;
};
