import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

const useTableSearch = ({ onSearchCallback }) => {
  const [description, setDescription] = useState('');

  const handleInput = (event) => {
    onSearchCallback();
    debounceInput?.(event);
  };

  const onInputCallback = useCallback(
    (event) => {
      onSearchCallback();
      setDescription(event.target.value);
    },
    [onSearchCallback],
  );

  const debounceInput = useMemo(() => debounce((event) => onInputCallback(event), 300), [onInputCallback]);

  useEffect(() => {
    console.log(description);
  }, [description]);

  return { description, handleInput };
};

export default useTableSearch;
