import { addClass, removeClass } from "./add-remove-toggle";

export const addRuleConfirm = (
  id: string
): void => {
  const listOfRules = document.querySelectorAll("#rule>li");

  listOfRules.forEach((rule) => {
    if (rule.getAttribute("id") === id) {
      addClass(rule, "rule-confirm");
    }
  });
};

export const verificationRules = (
  inputValue: number,
  numberList: number[]
): void => {
  const existNumber = numberList.includes(inputValue);

  if (isNaN(inputValue)) {
    removeRuleConfirm("is-valid", "single");
  } else {
    addRuleConfirm("is-valid");
  }

  if (inputValue < 0) {
    removeRuleConfirm("no-negative", "single");
  } else {
    addRuleConfirm("no-negative");
  }

  if (existNumber) {
    removeRuleConfirm("no-repeat", "single");
  } else {
    addRuleConfirm("no-repeat");
  }

  if (inputValue === 0 || inputValue > 100) {
    removeRuleConfirm("one-and-one-hundred", "single");
  } else {
    addRuleConfirm("one-and-one-hundred");
  }

  if (!Number.isInteger(inputValue)) {
    removeRuleConfirm("inter-number", "single");
  } else {
    addRuleConfirm("inter-number");
  }
};

export const removeRuleConfirm = (
  id: string,
  option: string
): void => {
  const listOfRules = document.querySelectorAll("#rule>li");

  listOfRules.forEach((rule) => {
    if (option === "single" && id === rule.id) {
      removeClass(rule, "rule-confirm");
    }

    if (option === "all") {
      removeClass(rule, "rule-confirm");
    }
  });
};
