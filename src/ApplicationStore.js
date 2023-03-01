import { contains, find } from "@laufire/utils/collection";
import { isDefined } from "@laufire/utils/reflection";

const getAction = (data) => {
	const actionDetails = [
		{
			action: 'read',
			dataExsist: true,
			res: 'update'
		},
	];

	return find(actionDetails, (detail) => contains(detail, data))?.res
}


const ApplicationStore = ({ data, pipe = () => { } }) => {
	const { state, setState, entity: defaultEntity } = data;

	const actions = {
		create: ({ entity, data, }) => {
			setState((state) => ({
                ...state,
                [entity]: [...state[entity], data],
            }));
		},
		delete: ({ entity, data }) => setState({
			...state,
			[entity]: [],
		}),
		read: ({ entity }) => state[entity],
		update: ({ entity, data }) => setState((state) => ({
			...state,
			[entity]: data,
		})),
	};


	const store = async ({ action, entity, data }) => {
		const temp = getAction({ action: action, dataExsist: isDefined(data)});

		actions[temp || action]({ entity: entity || defaultEntity, data });

		await pipe({ action, entity, data });
	};

	return store;
};

export default ApplicationStore;


