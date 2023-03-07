import {
	contains, find, select,
} from '@laufire/utils/collection';
import { isArray, isDefined } from '@laufire/utils/reflection';
import actions from './actions';

const actionDetails = [
	{
		action: 'read',
		dataExsist: true,
		res: 'update',
	},
];

const getAction = (data) =>
	find(actionDetails, (detail) => contains(detail, data))?.res || data.action;

const ApplicationStore = (constructorContext) => {
	const { data: constructorData, pipe = () => {} } = constructorContext;
	const { setState, entity: defaultEntity } = constructorData;

	return (context) => {
		const { action, entity, data } = context;

		const currentAction = getAction({
			action: action,
			dataExsist: isDefined(data),
		});

		setState((state) => {
			const res = actions[currentAction]({
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
