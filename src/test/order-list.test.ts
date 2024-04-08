import { orderList } from "../server/order-list";

describe("Ordenar Numeros", () => {
  test("Ordenar: 5, 8, 3, 6", () => {
    expect(orderList([5, 8, 3, 6])).toEqual([3, 5, 6, 8]);
  });
  test("Ordenar: 65, 86, 34, 54", () => {
    expect(orderList([65, 86, 34, 54])).toEqual([34, 54, 65, 86]);
  });
  test("Ordenar: 65, 86, 34, 54, 99, 58, 100, 1, 5, 3", () => {
    expect(orderList(
      [65, 86, 34, 54, 99, 58, 100, 1, 5, 3])
    ).toEqual(
      [1, 3, 5, 34, 54, 58, 65, 86, 99, 100]
    );
  });
});
