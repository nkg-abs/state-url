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

const RemoteStore = ({ data: { url }, pipe }) =>
	async (controllerContext) => {
		const { action, entity } = controllerContext;

		pipe({
			...controllerContext,
			...status.pending,
		});

		const resp = await axios(payloadManager[action]({
			...controllerContext,
			url: `${ url }${ entity }/`,
		}));

		pipe({
			...controllerContext,
			...status.completed,
			data: isArray(resp.data) ? setUIID(resp.data) : resp.data,
		});
	};

export default RemoteStore;
