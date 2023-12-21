import { isNullOrUndef } from '../maybe';

export const OptionType = {
  Some: Symbol(':Some'),
  None: Symbol(':None'),
};

export interface Match<T, U> {
  some: (val: T) => U;
  none: (() => U) | U;
}

// this means
// some: (res) => generateResults('book found', res),
// none could be none: () => generateResults('book not found', null),
// or none: generateResults('book not found', null),

export interface Option<T> {
  type: symbol;
  match<U>(fn: Match<T, U>): U;
  map<U>(fn: (val: T) => U): Option<U>;
  isSome(): boolean;
  isNone(): boolean;
  unwrap(): T | never;
  andThen<U>(fn: (val: T) => Option<U>): Option<U>;
}

export interface OptSome<T> extends Option<T> {
  map<U>(fn: (val: T) => U): OptSome<U>;
}

export interface OptNone<T> extends Option<T> {
  map<U>(fn: (val: T) => U): OptNone<U>;
}

export const Some = <T>(val?: T | undefined): Option<T> => {
  // this is the critical piece that shifts something
  // that is supposed to be a some.
  // if it finds something wrong, it switches it
  // to a none automaticaly !!!!
  // return typeof val === 'undefined' ? none<T>() : some<T>(val as T);
  return isNullOrUndef(val) ? none<T>() : some<T>(val as T)
};

const some = <T>(val: T): OptSome<T> => {
  return {
    type: OptionType.Some,
    match<U>(fn: Match<T, U>): U {
      return fn.some(val);
    },
    map<U>(fn: (val: T) => U): OptSome<U> {
      return some<U>(fn(val));
    },
    isSome(): boolean {
      return true;
    },
    isNone(): boolean {
      return false;
    },
    unwrap(): T {
      return val;
    },
    andThen<U>(fn: (val: T) => Option<U>): Option<U> {
      return fn(val);
    },
  };
};

const none = <T>(): OptNone<T> => {
  return {
    type: OptionType.None,
    match<U>(matchObject: Match<T, U>): U {
      const { none } = matchObject;
      if (typeof none === 'function') {
        return (none as () => U)();
      }
      return none;
    },
    map<U>(fn: (val: T) => U): OptNone<U> {
      return none<U>();
    },
    isSome(): boolean {
      return false;
    },
    isNone(): boolean {
      return true;
    },
    unwrap() {
      throw new Error('you are trying to unwrap an option without a value');
    },
    andThen<U>(fn: (val: T) => Option<U>): OptNone<U> {
      return none<U>();
    },
  };
};

export function isSome<T>(val: Option<T>): val is OptSome<T> {
  return val.isSome();
}

export function isNone<T>(val: Option<T>): val is OptNone<T> {
  return val.isNone();
}

export const None = none<any>();
