import React, { useState } from 'react';

const Parent = ({ children }) =>
  {
    const [count, setCount] = useState(0);

    return (
      <div onClick={() => setCount((count) => count + 1)}>
        count: { count }
        <div>{ children }</div>
      </div>
    );
  };

const Children = () => <span>{ Date.now() }</span>;

const App = () => 
  <div>
    <Parent>
      <Children></Children>
    </Parent>
  </div>;

export default App;