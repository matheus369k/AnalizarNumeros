import {JSDOM} from "jsdom";
import { toAdd } from "../server/add";

describe("Adicionar Numeros", () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;

    test("Adicionar", () => {
        document.body.innerHTML = "<div id='numbers-container'><ul></ul></div>";
        const numbersListContainer = document.querySelector("#numbers-container>ul")

        toAdd([],76)
        
        expect(numbersListContainer?.firstChild?.textContent).toBe("76")
    });
});