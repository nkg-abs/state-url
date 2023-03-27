import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StateUrl = ({ children, onChange, value }) => {
  const urlText = new URLSearchParams(window.location.search).get('state') ;
  const dValue = value || urlText;
  const navigate = useNavigate();
  const cache = useRef(urlText);

  useEffect(() => {
    console.log('from onChange', urlText, cache.current, dValue);
    cache.current !== urlText && onChange({ target: { value: urlText }});
  }, [urlText]);

  useEffect(() => {
    console.log('navigating', `/?state=${ dValue }`);
    cache.current = urlText;
    urlText !== dValue  && navigate(`/?state=${ dValue }`);
  }, [dValue]);
  
  return children;
};

export default StateUrl;