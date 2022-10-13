import React from 'react'

const App = () =>
  <div>
    <button onClick={() =>
      window.history.pushState({}, '', '/clicked')}>
      Change URL
    </button>
  </div>

export default App;