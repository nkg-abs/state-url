import { contains, findIndex } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

const actionDetails = {
	update: {
		action: 'read',
		dataExist: true,
	},
};

const getAction = (context) => {
	const { action, data } = context;
	const entityType = { action: action, dataExist: isDefined(data) };

	return findIndex(actionDetails, (detail) =>
		contains(detail, entityType)) || action;
};

export default getAction;
