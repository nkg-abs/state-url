import axios from 'axios';
import stores from './stores';

const RemoteStore = (context) => {
	const { data: { url }, pipe } = context;

	return async (controllerContext) => {
		const { action, entity, data = {}} = controllerContext;

		const resp = await axios(stores[action]({
			...controllerContext,
			data: data,
			url: `${ url }${ entity }/`,
		}));


		await pipe({ ...controllerContext, data: resp.data });
	};
};

export default RemoteStore;
