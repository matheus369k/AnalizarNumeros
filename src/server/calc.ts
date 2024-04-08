export const media = (numbers: number[], sum: number): number => {
  return Number((sum / numbers.length).toFixed(1));
};

export const sum = (numbers: number[]): number => {
  const initialValue = 0;
  const total = numbers.reduce(
    (accumulator: number, current: number) => accumulator + current,
    initialValue
  );
  return total;
};
