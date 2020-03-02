const baseState = {
  zoom: 1,
  rotation: 0
};

export type StateKey = keyof typeof baseState;
export type StateValue<K extends StateKey> = typeof baseState[K];
export type SubscriberFunction<K extends StateKey> = (value: StateValue<K>) => void

const handlers = new Map<string, Map<Symbol, any>>();

export const getState = <K extends StateKey>(key: K): StateValue<K>  => {
  return baseState[key];
}

/*
 * Sets the current state and calls and subscribers that are subscribed to that key 
 */
export const setState = <K extends StateKey>(key: K, value: StateValue<K>) => {
  baseState[key] = value;
  const handlerScope = handlers.get(key);
  if (handlerScope) {
    const funcs = handlerScope.values();
    Array.from(funcs, (func: SubscriberFunction<K>) => func(value))
  }
}

/**
 * Binds to an item on state.
 * 'onChange' gets called every time the state is changed.
 * Returns a function that can be used to kill the subscriber.
 */
export const subscribe = <K extends StateKey>(key: K, onChange: SubscriberFunction<K>) => {
  const handlerKey = Symbol();
  let handlerScope = handlers.get(key);
  if (!handlerScope) {
    handlerScope = new Map();
  }
  handlerScope.set(handlerKey, onChange);
  handlers.set(key, handlerScope);
  return () => {
    const scope = handlers.get(key);
    scope.delete(handlerKey);
  }
}