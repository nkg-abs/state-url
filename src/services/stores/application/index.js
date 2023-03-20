import getUpdatedState from './getUpdatedState';

const application = (context) => {
	const { action, entity, setState } = context;

	setState((state) => {
		const res = getUpdatedState({
			...context,
			state,
			entity,
		});

		return action === 'read' ? state : res;
	});
};

export default application;
