
export const isFunction = <T>(object: T): boolean => {
  return typeof object === 'function';
};

export const isEmpty = <T>(value: T[] | T): boolean => {
  if (Array.isArray(value)) return value.length === 0;
  else return Object.getOwnPropertyNames(value).length === 0;
};

export const not = (value: boolean): boolean => {
  return !value;
};

export const unique = <T>(array: T[]): T[] => {
  return array.filter((value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  });
};
