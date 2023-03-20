import { filter, map } from '@laufire/utils/collection';
import { identity } from '@laufire/utils/fn';
import config from '../../config';
import stores from '../stores';

const executeStores = async (context) => {
	await Promise.all(map(context.stores,
		(store) => {
			const storeData = (buildPipeData[store] || identity)(context);

			stores[store](storeData);
		}));
};

const buildPipeData = {
	remote: (context) => {
		const { entity } = context;

		const res = {
			...context,
			pipe: ({ data }) => {
				const response = {
					...context,
					data: data,
					stores: filter(config[entity].stores, (store) =>
						!['remote'].includes(store)),
				};

				executeStores(response);
			},
		};

		return res;
	},
};

const Hub = (hubContext) => async (context) => {
	const { entity } = context;

	await executeStores({
		...hubContext,
		...context,
		stores: config[entity].stores,
	});
};

export default Hub;
