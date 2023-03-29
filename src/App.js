import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { rndString } from '@laufire/utils/random';
import LocListener from './components/LocListener';


const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState(searchParams.get('state'));
  const value = text;
  const onChange = ({target: { value }}) => setText(value);
  const navigate = useNavigate();

  return (
    <>
      { text }
      <button onClick={() => {
        const newUrl = rndString(); 
        navigate(`?state=${newUrl}`)
      }}>changeURL</button>
      <button onClick={() => setText('newState')}>changeState</button>
      <LocListener {...{ onChange, value, setSearchParams }} />
    </>
  );
};

export default App;