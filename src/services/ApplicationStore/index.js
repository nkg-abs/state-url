import {
	contains, filter, find,
	map, select,
} from '@laufire/utils/collection';
import { isArray, isDefined } from '@laufire/utils/reflection';

const actionDetails = [
	{
		action: 'read',
		dataExsist: true,
		res: 'update',
	},
];

const getAction = (data) =>
	find(actionDetails, (detail) => contains(detail, data))?.res;

// eslint-disable-next-line max-lines-per-function
const ApplicationStore = (constructorContext) => {
	const { data: constructorData, pipe = () => {} } = constructorContext;
	const { setState, entity: defaultEntity } = constructorData;

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
		update: ({ state, entity, data }) => {
			const idExsist = isDefined(data.id);

			return {
				...state,
				[entity]: idExsist
					? map(state[entity], (todo) => {
						const { id } = todo;

						return id === data.id ? data : todo;
					})
					: data,
			};
		},
	};

	return (context) => {
		const { action, entity, data } = context;

		const currentAction = getAction({
			action: action,
			dataExsist: isDefined(data),
		});

		// eslint-disable-next-line complexity
		setState((state) => {
			const res = actions[currentAction || action]({
				state: state,
				entity: entity || defaultEntity,
				data: isArray(data) ? data : select(context, ['id', 'data']),
			});

			pipe({ ...context, data: res, status: 'completed' });

			return action === 'read' ? state : res;
		});
	};
};

export default ApplicationStore;
