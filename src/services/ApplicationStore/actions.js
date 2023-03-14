import { filter, map } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

// TODO: crud should work on collections.
const actions = {
	create: ({ state, entity, data }) => ({
		...state,
		[entity]: [...state[entity], data],
	}),
	delete: ({ entity, state, data }) => ({
		...state,
		[entity]: filter(state[entity], ({ id }) => id !== data.id),
	}),
	read: ({ state, entity }) => state[entity],
	update: ({ state, entity, data: { id }, data }) => {
		const idExist = isDefined(id);

		return {
			...state,
			[entity]: idExist
				? map(state[entity], (todo) => {
					const { id: todoId } = todo;

					return todoId === id ? data : todo;
				})
				: data,
		};
	},
};

export default actions;
