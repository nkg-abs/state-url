import React, { useEffect, useState } from 'react';
import { peek } from '@laufire/utils/debug';
import { rndString } from '@laufire/utils/random';
import Hub from './services/Hub';

// eslint-disable-next-line max-lines-per-function
const App = () => {
	const [state, setState] = useState({
		todos: [{ id: 1 }],
	});

	useEffect(() => {
		// NOTE: try to update through appStore.
		setState((prevState) => ({
			...prevState,
			hub: Hub({
				setState: setState,
				url: 'http://localhost:6005/',
			}),
		}));
	}, []);

	peek(state, 'state');

	return (
		<div onClick={ async () => {
			await state.hub({
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
		</div>
	);
};

export default App;
