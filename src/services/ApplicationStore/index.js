import getUpdatedState from './getUpdatedState';

const ApplicationStore = (constructorContext) => {
	const { data: constructorData, pipe = () => {} } = constructorContext;
	const { setState, entity: defaultEntity } = constructorData;

	return (context) => {
		const { action, entity } = context;

		setState((state) => {
			const res = getUpdatedState({
				...context,
				state: state,
				entity: entity || defaultEntity,
			});

			pipe({ ...context, data: res, status: 'completed' });

			return action === 'read' ? state : res;
		});
	};
};

export default ApplicationStore;
