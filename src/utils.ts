
export type Indefinable<T> = T | undefined;

export interface IndexableObject extends Object {
  [index: string]: any;
}

export const isFunction = <T>(object: T): boolean => typeof object === 'function';

export const isEmpty = <T>(value: T[] | T): boolean => {
  if (Array.isArray(value)) return value.length === 0;
  else return Object.keys(value).length === 0;
};

export const not = (value: boolean): boolean => !value;

export const matchObjects = <T extends U, U extends IndexableObject>(matched: T) => (target: U): boolean =>
  Object.keys(matched).every((field: string) =>
    Object.keys(target).includes(field) && matched[field] === target[field]);

export const add = <T>(array: T[]) => (value: T): T[] => [...array, value];

export const set = <T>(array: T[]) => (index: number) => (value: T): T[] => {
  if (array.length <= index || index < 0) return array;
  return [...array.slice(0, index), value, ...array.slice(index + 1, array.length)];
};

export const range = (length: number): number[] => {
  const array = [] as number[];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }
  return array;
};
