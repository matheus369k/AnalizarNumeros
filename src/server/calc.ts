export const middle = (
  numbers: number[],
  sum: (numbers: number[]) => number
): number => {
  return sum(numbers) / numbers.length;
};

export const sum = (numbers: number[]): number => {
  const initialValue = 0;
  const total = numbers.reduce(
    (accumulator: number, current: number) => accumulator + current,
    initialValue
  );
  return total;
};
