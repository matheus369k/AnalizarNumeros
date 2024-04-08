import { media, sum } from "../server/calc";

describe("Calculos", () => {
    test("Media de: 5, 5, 5, 5", () => {
        expect(media([5, 5, 5, 5], 20)).toBe(5);
    });
    test("Media de: 56, 33, 82, 99", () => {
        expect(media([56, 33, 82, 99], 270)).toBe(67.5);
    });

    test("Soma de: 5, 5, 5, 5", () => {
        expect(sum([5, 5, 5, 5])).toBe(20);
    });
    test("Soma de: 56, 33, 82, 99", () => {
        expect(sum([56, 33, 82, 99])).toBe(270);
    });
});