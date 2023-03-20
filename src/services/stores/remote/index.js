import { isArray } from '@laufire/utils/reflection';
import axios from 'axios';
import payloadManager from './payloadManager';
import setUIID from './setUIID';

const status = {
	pending: {
		status: 'pending',
	},
	completed: {
		action: 'update',
		status: 'completed',
	},
	error: {
		status: 'error',
	},
};

const remote =	async (controllerContext) => {
	const { action, entity, url, pipe } = controllerContext;

	const { data: response } = await axios(payloadManager[action]({
		...controllerContext,
		url: `${ url }${ entity }/`,
	}));

	pipe({
		...controllerContext,
		...status.completed,
		data: isArray(response) ? setUIID(response) : response,
	});
};

export default remote;
