export const sortList = (list: number[]): number[] => {
  return list.sort((prev: number, next: number) => prev - next);
};
