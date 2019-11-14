const listSort = (toSort, orderBy, order) => {
	return toSort.sort((element1, element2) => {
		const el1 = element1[orderBy];
		const el2 = element2[orderBy];
		if (order === "asc") {
			return el1 > el2 ? 1 : el1 < el2 ? -1 : 0;
		} else {
			return el1 > el2 ? -1 : el1 < el2 ? 1 : 0;
		}
	});
};

export default listSort;
