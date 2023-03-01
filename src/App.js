import React from "react";
import { useEffect, useState } from "react";
import ApplicationStore from "./ApplicationStore";
import RemoteStore from "./RemoteStore";
import { peek } from '@laufire/utils/debug';

const App = () => {
  const [state, setState] = useState({
    todos: [{ id: 1 }],
  });

  useEffect(() => {
    const appStore = ApplicationStore({
      data: {
        setState,
      }
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

      // NOTE: try to update through appStore.
      setState((state) => ({
        ...state,
        appStore,
        remoteStore,
      }))
    })(); 
  }, []);

  peek(state);

  return (<div onClick={async () => {
    await state.remoteStore({
			action: 'create',
			entity: 'todos',
			data: {
				text: 'hello',
				completed: false,
			},
		})
    console.log(state);
  }}>
    appp
  </div>);
};

export default App;