export const orderList = (list: number[]): number[] => {
  return list.sort((prev: number, next: number) => prev - next);
};
