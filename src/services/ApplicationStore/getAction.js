import { contains } from '@laufire/utils/collection';

const actionDetails = [
	{
		action: 'read',
		dataExsist: true,
		res: 'update',
	},
];

const getAction = (data) =>
	find(actionDetails, (detail) => contains(detail, data))?.res || data.action;

export default getAction;
