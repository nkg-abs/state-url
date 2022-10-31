import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import jsonUrl from 'json-url';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/post/hello-world">Post</Link>
            </li>
            <li>
              <Link to="/users/?state=XQAAAAIBAAAAAAAAAAACwfv____gAAAA">Users</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/users/" element={<Users />} /> 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// Old way to fetch history
function Post(props) {
  console.log('Post');
  return (
    <div>
      In React Router v4, you get the history object from props. <br />
      <button type="button" onClick={() => props.history.goBack()}>
        Go back
      </button>
    </div>
  );
}

// new way to fetch history with hooks
function Users() {
  const navigate = useNavigate();
  const { compress, decompress } = jsonUrl('lzma');
  const { clipboard } = navigator;
  const stateUrl = new URLSearchParams(window.location.search).get('state');
  const [counter, setCounter] = useState(0);
  console.log(stateUrl ,decompress(stateUrl), 're rendered');
  
  useEffect(() => {
    (async () => {
      const { compress } = jsonUrl('lzma');
      navigate(`/users/?state=${ await compress(counter)}`);
      console.log('Url updated');
    })();
  }, [counter, navigate]);
  useEffect(() => {
    (async () => {  
      const { decompress } = jsonUrl('lzma');
      const state = await decompress(stateUrl);
      setCounter(state);
      console.log(state, 'State updated');
    })();
  }, [stateUrl]);
  
  return (
    <div>
      In React Router v5, You can use hooks to get history object.
      <br />
      <button type="button" onClick={() => navigate(-1)}>
        Go back
      </button>
      <button onClick={() => {
        setCounter(count => {
          const updatedCount = count + 1;

          return updatedCount;
        });
      }}>
        change Counter { counter }
      </button>
      <button onClick={async () => {
        const encodedState = await compress(counter);

        clipboard.writeText(`http://localhost:3003/users/?state=${ encodedState }`);
      }}>
        Get Link!
      </button>
    </div>
  );
}

function Home() {
  return (
    <div className="App">
      <h1>React Router useHistory hook</h1>
      <h2>Inspect the code and click on the menu above</h2>
    </div>
  );
}
