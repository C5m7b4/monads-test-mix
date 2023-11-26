export const compose =
  <T>(...fns: Function[]) =>
  (x: T) =>
    fns.reduce((y, f) => f(y), x);

export const curry = (f: Function) => {
  return function curried(...args: any[]) {
    if (args.length >= f.length) {
      return f(...args);
    } else {
      return (...args2: any) => curried(...args.concat(args2));
    }
  };
};
