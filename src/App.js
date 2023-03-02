import React, { useEffect, useState } from 'react';
import ApplicationStore from './ApplicationStore';
import RemoteStore from './RemoteStore';
import { peek } from '@laufire/utils/debug';
import { rndString } from '@laufire/utils/random';

// eslint-disable-next-line max-lines-per-function
const App = () => {
	const [state, setState] = useState({
		todos: [{ id: 1 }],
	});

	// eslint-disable-next-line max-lines-per-function
	useEffect(() => {
		const appStore = ApplicationStore({
			data: {
				setState,
			},
		});

		const remoteStore = RemoteStore({
			pipe: (pipeContext) => { appStore(pipeContext); },
			data: {
				url: 'http://localhost:6005/',
			},
		});

		(async () => {
			await remoteStore({
				entity: 'todos',
				action: 'read',
			});
		})();

		// NOTE: try to update through appStore.
		setState((prevState) => ({
			...prevState,
			appStore,
			remoteStore,
		}));
	}, []);

	peek(state);

	return (
		<div onClick={ async () => {
			await state.remoteStore({
				action: 'create',
				entity: 'todos',
				id: rndString(),
				data: {
					text: 'hello',
					completed: false,
				},
			});
		} }
		>
			appp
		</div>);
};

export default App;
