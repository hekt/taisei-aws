export function toPromise<T>(returnValue: T): Promise<T> {
  return new Promise((resolve, reject) => resolve(returnValue));
}
