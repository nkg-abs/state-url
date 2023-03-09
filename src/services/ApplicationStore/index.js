import { select } from '@laufire/utils/collection';
import { isArray } from '@laufire/utils/reflection';
import actions from './actions';
import getAction from './getAction';

const ApplicationStore = (constructorContext) => {
	const { data: constructorData, pipe = () => {} } = constructorContext;
	const { setState, entity: defaultEntity } = constructorData;

	return (context) => {
		const { action, entity, data } = context;

		setState((state) => {
			const res = actions[getAction(context)]({
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
