import { select, map } from '@laufire/utils/collection';
import { rndString } from '@laufire/utils/random';
import { isArray } from '@laufire/utils/reflection';
import axios from 'axios';
import stores from './stores';

// eslint-disable-next-line max-lines-per-function
const RemoteStore = (context) => {
	const { data: { url }, pipe } = context;

	// eslint-disable-next-line max-lines-per-function
	return async (controllerContext) => {
		const { action, entity, data = {}} = controllerContext;

		pipe({
			...controllerContext,
			status: 'pending',
			data: select(controllerContext, ['id', 'data']),
		});

		const resp = await axios(stores[action]({
			...controllerContext,
			data: data,
			url: `${ url }${ entity }/`,
		}));

		pipe({
			...controllerContext,
			action: 'update',
			status: 'completed',
			data: isArray(resp.data)
				? map(resp.data, (item) => ({
					id: rndString(),
					data: item,
				}))
				: resp.data,
		});
	};
};

export default RemoteStore;
