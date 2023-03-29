import { useEffect, useRef } from 'react';

function LocListener({ onChange, value }) {
  const cache = useRef(value);

  const popStateHandler = (e) => {
    const urlState = new URLSearchParams(window.location.search).get('state');
    console.log(e, urlState);
    cache.current = urlState;
    onChange({ target: { value: urlState }});
  };

  useEffect(() => window.addEventListener('popstate', popStateHandler), []);

  useEffect(() => {
    const isPush = value !== cache.current;
    isPush && console.log('pushing', value)
    isPush && window.history.pushState(`?state=${value}`,'');
  }, [value]);  
};

export default LocListener;