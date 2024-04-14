import { delDataOnTheUrlState, getDataOnTheUrlState, setDataOnTheUrlState } from "../server/url-state";

describe("Url State", () => {
    test("Add params", () => {
        setDataOnTheUrlState("list", [1, 6, 3, 7]);
        
        const url = new URL(window.location.toString());

        expect(url.searchParams.get("list")).toEqual("1,6,3,7");
    });
    test("Get params", () => {
        expect(getDataOnTheUrlState()).toEqual({
            listOfNumber: ["1", "6", "3", "7"],
            analiseState: null,
        });
    });
    test("Delete params", () => {
        delDataOnTheUrlState("list");

        expect(window.location.toString().search("list")).toBe(-1);
    });
});