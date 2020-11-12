import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useLocalStorage } from 'hooks';
import { THEATER_MODE } from 'keys';

const TheaterModeStateContext = createContext(null);
const TheaterModeDispatchContext = createContext(null);

const actionTypes = {
  update: 'update',
  toggle: 'toggle',
};

const toggleTheaterMode = () => ({ type: actionTypes.toggle });

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.update: {
      return action.payload;
    }
    case actionTypes.toggle: {
      return !state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const TheaterModeProvider = ({ children }) => {
  const { storedValue: theaterMode, setValue } = useLocalStorage(THEATER_MODE, false);
  const [state, dispatch] = useReducer(reducer, theaterMode);

  useEffect(() => {
    setValue(state);
  }, [state, setValue]);

  return (
    <TheaterModeStateContext.Provider value={state}>
      <TheaterModeDispatchContext.Provider value={dispatch}>
        {children}
      </TheaterModeDispatchContext.Provider>
    </TheaterModeStateContext.Provider>
  );
};

function useTheaterModeState() {
  const context = useContext(TheaterModeStateContext);
  if (context === undefined) {
    throw new Error(`useTheaterModeState must be used within a TheaterModeProvider`);
  }
  return context;
}

function useTheaterModeDispatch() {
  const context = useContext(TheaterModeDispatchContext);
  if (context === undefined) {
    throw new Error(`useTheaterModeDispatch must be used within a TheaterModeProvider`);
  }
  return context;
}

function useTheaterMode() {
  const context = [useTheaterModeState(), useTheaterModeDispatch()];
  if (context === undefined) {
    throw new Error(`useTheaterMode must be used within a TheaterModeProvider`);
  }
  return context;
}

export {
  TheaterModeProvider as default,
  useTheaterMode,
  useTheaterModeState,
  useTheaterModeDispatch,
  toggleTheaterMode,
};
