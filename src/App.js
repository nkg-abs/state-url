import React, { useEffect, useState } from 'react';
import jsonUrl from 'json-url';

const App = () => {
  const [student, setStudent] = useState({});
  const { compress } = jsonUrl('lzma');
  const { clipboard } = navigator;

  useEffect(() => {
    (async () => {
      const stateUrl = new URLSearchParams(window.location.search).get('state');
      const { decompress } = jsonUrl('lzma');

      setStudent(await decompress(stateUrl));
    })();
  }, []);
  
  return (
    <div>
      <button onClick={async () => {
        const encodedState = await compress(student);

        clipboard.writeText(`https/localhost:3003?state=${ encodedState }`);
      }}>
        Get Link!
      </button>
    </div>
  );
};

export default App;