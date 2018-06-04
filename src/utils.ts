
export const isFunction = <T>(object: T): boolean => {
  return typeof object === 'function';
};

export const unique = <T>(array: T[]): T[] => {
  return array.filter((value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  });
};

export const getExceptionMessage = (interceptors: string[]): string => {
  return `There are unresolved interceptors!\n\t${interceptors.join('\n\t')}\n`;
};
