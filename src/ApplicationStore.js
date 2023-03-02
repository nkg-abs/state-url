import { contains, find } from '@laufire/utils/collection';
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
		create: ({ entity, data }) => {
			setState((state) => ({
				...state,
				[entity]: [...state[entity], data],
			}));
		},
		delete: ({ entity }) => setState((state) => ({
			...state,
			[entity]: [],
		})),
		read: () => setState((state) => {
			pipe(state);
			return state;
		}),
		update: ({ entity, data }) => setState((state) => ({
			...state,
			[entity]: data,
		})),
	};

	const store = async (context) => {
		// eslint-disable-next-line unused-imports/no-unused-vars
		const { action, entity, data } = context;

		const currentAction = getAction({
			action: action,
			dataExsist: isDefined(data),
		});

		actions[currentAction || action]({
			entity: entity || defaultEntity,
			data: data,
		});
		await pipe({ ...context, status: 'completed' });
	};

	return store;
};

export default ApplicationStore;
