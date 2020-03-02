import { useState, useEffect } from 'react';
import { StateKey, getState, setState, subscribe, StateValue } from './state';

export default (key: StateKey) => {
  const [currentValue, setCurrentValue] = useState(getState(key));

  useEffect(() => subscribe(key, setCurrentValue), [])

  const set = (value: StateValue<typeof key>) => setState(key, value);

  return [ currentValue, set ]
}