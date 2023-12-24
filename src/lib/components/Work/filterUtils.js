import { writable } from 'svelte/store';

export const workFilters = writable({
	tags: new Set(),
	type: new Set()
});

export function toggleItem(criteria, criteriaType, value) {
	const updatedCriteria = { ...criteria };

	if (criteriaType === 'type') {
		const currentType = updatedCriteria[criteriaType];
		if (currentType.size === 1 && currentType.has(value)) {
			// If the clicked type is already selected, clear the selection
			updatedCriteria[criteriaType] = new Set();
		} else {
			// Otherwise, set the clicked type as the only selected type
			updatedCriteria[criteriaType] = new Set([value]);
		}
	} else {
		// Handle other criteria types as before
		const criteriaSet = new Set(updatedCriteria[criteriaType]);
		if (criteriaSet.has(value)) {
			criteriaSet.delete(value);
		} else {
			criteriaSet.add(value);
		}
		updatedCriteria[criteriaType] = criteriaSet;
	}

	return updatedCriteria;
}

export function filterData(works, criteria) {
	return works.filter((work) =>
		Object.entries(criteria).every(
			([key, valueSet]) =>
				valueSet.size === 0 ||
				(Array.isArray(work[key]) && work[key].some((value) => valueSet.has(value))) ||
				(!Array.isArray(work[key]) && valueSet.has(work[key]))
		)
	);
}
