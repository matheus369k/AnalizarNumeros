import {
  verificationRules,
  addRuleConfirm,
  removeRuleConfirm,
} from "../server/rules";

document.body.innerHTML = 
    "<ul id='rule' class='rule-list'>" +
      "<li id='one-and-one-hundred'></li>" +
      "<li id='no-repeat'></li>" +
      "<li id='no-negative'></li>" +
      "<li id='is-valid'></li>" +
      "<li id='inter-number'></li>" +
    "</ul>";


const confirmRuleAllElement = document.querySelectorAll("#rule>li");
test("add class", () => {
  addRuleConfirm("is-valid");

  const confirmRuleElement = document.getElementById("is-valid");

  expect(confirmRuleElement?.classList).toContain("rule-confirm");

  confirmRuleElement?.classList.remove("rule-confirm");
});

describe("Remove classes", () => {
  test("single class", () => {
    confirmRuleAllElement[0].classList.add("rule-confirm");

    removeRuleConfirm("one-and-one-hundred", "single");

    expect(
      confirmRuleAllElement[0].classList.contains("rule-confirm")
    ).toBeFalsy();
  });
  test("All classes", () => {
    confirmRuleAllElement.forEach((element) => {
      element.classList.add("rule-confirm");
    });

    removeRuleConfirm("", "all");

    const confirmRuleElements = document.querySelectorAll(".rule-confirm");

    expect(confirmRuleElements.length).toBe(0);
  });
});
describe("Verification rules", () => {
  test("Is not number", () => {
    verificationRules(Number("50,70"), []);

    expect(confirmRuleAllElement[3].classList).not.toContain("rule-confirm");
  });
  test("Is number", () => {
    verificationRules(50, []);

    expect(confirmRuleAllElement[3].classList).toContain("rule-confirm");
  });

  test("Number is not negative", () => {
    verificationRules(50, []);

    expect(confirmRuleAllElement[2].classList).toContain("rule-confirm");
  });
  test("Number is negative", () => {
    verificationRules(-50, []);

    expect(confirmRuleAllElement[2].classList).not.toContain("rule-confirm");
  });

  test("Number not exist", () => {
    verificationRules(50, []);

    expect(confirmRuleAllElement[1].classList).toContain("rule-confirm");
  });
  test("Number exist", () => {
    verificationRules(50, [50]);

    expect(confirmRuleAllElement[1].classList).not.toContain("rule-confirm");
  });

  test("Number is bigger then 100", () => {
    verificationRules(101, []);

    expect(confirmRuleAllElement[0].classList).not.toContain("rule-confirm");
  });
  test("Number is 0", () => {
    verificationRules(0, []);

    expect(confirmRuleAllElement[0].classList).not.toContain("rule-confirm");
  });
  test("Number is less then 100 and bigger the 0", () => {
    verificationRules(10, []);

    expect(confirmRuleAllElement[0].classList).toContain("rule-confirm");
  });

  test("Number is not int", () => {
    verificationRules(10.5, []);

    expect(confirmRuleAllElement[4].classList).not.toContain("rule-confirm");
  });
  test("Number is inter", () => {
    verificationRules(10, []);

    expect(confirmRuleAllElement[4].classList).toContain("rule-confirm");
  });
});
