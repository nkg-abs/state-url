import { isArray } from '@laufire/utils/reflection';
import { rndString } from '@laufire/utils/random';
import { map } from '@laufire/utils/collection';
import axios from 'axios';
import stores from './stores';

const appendUIID = (data) => map(data, (item) => ({
	id: rndString(),
	data: item,
}));

// eslint-disable-next-line max-lines-per-function
const RemoteStore = (context) => {
	const { data: { url }, pipe } = context;

	return async (controllerContext) => {
		const { action, entity } = controllerContext;

		pipe({
			...controllerContext,
			status: 'pending',
		});

		const resp = await axios(stores[action]({
			...controllerContext,
			url: `${ url }${ entity }/`,
		}));

		pipe({
			...controllerContext,
			action: 'update',
			status: 'completed',
			data: isArray(resp.data)
				? appendUIID(resp.data)
				: resp.data,
		});
	};
};

export default RemoteStore;
