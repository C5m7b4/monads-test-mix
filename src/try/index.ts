import { Either, Left, Right } from '../either';

interface Error {
  message: string;
}

export class Try<T> {
  result: Either<T, any>;
  constructor(fn: () => T, exceptionHandler: (error: any) => void) {
    try {
      this.result = Right(fn());
    } catch (e) {
      exceptionHandler(e);
      this.result = Left((e as Error).message as any);
    }
  }
}
