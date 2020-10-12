import { useState } from 'react';

const LS_PREFIX = 'CF';

function useLocalStorage(itemKey, initialValue) {
  const keyPath = `${LS_PREFIX}:${itemKey}`;

  const [storedValue, setStoredValue] = useState(() => {
    const lsValue = localStorage.getItem(keyPath);
    return (lsValue && JSON.parse(lsValue)) || initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(keyPath, JSON.stringify(value));
  };

  const remove = () => {
    localStorage.removeItem(keyPath);
  };

  return { storedValue, setValue, remove };
}

export default useLocalStorage;
