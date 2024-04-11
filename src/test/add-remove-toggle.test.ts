import { addClass, removeClass, toggleClass } from "../server/add-remove-toggle";

document.body.classList.add('remove');
const bodyElement = document.body

describe("to add, remove, toggle class on the element", () => {
  test("Add class", () => {
    addClass(bodyElement, "add");

    expect(bodyElement.classList).toContain("add");
  });
  test("Remove class", () => {
    removeClass(bodyElement, "remove");

    expect(bodyElement.classList).not.toContain("remove");
  });
  test("Toggle class", () => {
    toggleClass(bodyElement, "toggle");

    expect(bodyElement.classList).toContain("toggle");
  });
});
