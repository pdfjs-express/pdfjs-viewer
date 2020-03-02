import { useState, useEffect } from 'react';
import { StateKey, getState, setState, subscribe, StateValue } from './state';

type StateSetter<K extends StateKey> = (value: StateValue<K>) => void;

export default <K extends StateKey>(key: K): [ StateValue<K>,  StateSetter<K>] => {
  const [currentValue, setCurrentValue] = useState(getState(key));

  useEffect(() => subscribe(key, setCurrentValue), [])

  const set: StateSetter<K> = (value) => {
    setState(key, value)
  };

  return [ currentValue, set ]
}