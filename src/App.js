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
		const lastAppStore = ApplicationStore({
			data: {
				setState,
			},
		});

		const remoteStore = RemoteStore({
			pipe: (pipeContext) => { lastAppStore(pipeContext); },
			data: {
				url: 'http://localhost:6005/',
			},
		});

		const appStore = ApplicationStore({
			data: {
				setState,
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
			lastAppStore,
		}));
	}, []);

	peek(state, 'state');

	return (
		<div onClick={ async () => {
			await state.appStore({
				action: 'create',
				entity: 'todos',
				id: rndString(),
				data: {
					text: rndString(),
					completed: true,
				},
			});
		} }
		>
			appp
		</div>);
};

export default App;
