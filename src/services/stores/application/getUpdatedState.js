import { select } from '@laufire/utils/collection';
import { isArray } from '@laufire/utils/reflection';
import actions from './actions';
import getAction from './getAction';

const getUpdatedState = (context) => {
	const { data } = context;

	return actions[getAction(context)]({
		...context,
		data: isArray(data)
			? data
			: select(context, ['id', 'status', 'data']),
	});
};

export default getUpdatedState;
