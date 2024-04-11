import { toAdd } from "../server/add";
test("Adicionar Numeros", () => {
    document.body.innerHTML = "<div id='numbers-container'><ul></ul></div>";
    const numbersListContainer = document.querySelector("#numbers-container>ul")

    toAdd([], 76)

    expect(numbersListContainer?.firstChild?.textContent).toBe("76")
});