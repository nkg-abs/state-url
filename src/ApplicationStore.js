import { contains, filter, find } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

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
		update: ({ state, entity, data }) => ({
			...state,
			[entity]: data,
		}),
	};

	return (context) => {
		const { action, entity, data } = context;

		const currentAction = getAction({
			action: action,
			dataExsist: isDefined(data),
		});

		setState((state) => {
			const res = actions[currentAction || action]({
				state: state,
				entity: entity || defaultEntity,
				data: data,
			});

			pipe({ ...context, data: res, status: 'completed' });

			return res;
		});
	};
};

export default ApplicationStore;
