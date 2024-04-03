export const addRuleConfirm = (
  id: string,
  listOfRules: NodeListOf<Element>
): void => {
  listOfRules.forEach((element) => {
    if (element.getAttribute("id") === id) {
      element.classList.add("rule-confirm");
    }
  });
};

export const verificationRules = (
  inputValue: string,
  numberList: number[],
  listOfRules: NodeListOf<Element>
): void => {
  const existNumber = numberList.includes(Number(inputValue));

  if (isNaN(parseInt(inputValue)) || isNaN(parseFloat(inputValue))) {
    removeRuleConfirm("is-valid", "single", listOfRules);
  } else {
    addRuleConfirm("is-valid", listOfRules);
  }

  if (Number(inputValue) < 0) {
    removeRuleConfirm("no-negative", "single", listOfRules);
  } else {
    addRuleConfirm("no-negative", listOfRules);
  }

  if (existNumber) {
    removeRuleConfirm("no-repeat", "single", listOfRules);
  } else {
    addRuleConfirm("no-repeat", listOfRules);
  }

  if (Number(inputValue) < 0 || Number(inputValue) > 100) {
    removeRuleConfirm("one-and-onehundred", "single", listOfRules);
  } else {
    addRuleConfirm("one-and-onehundred", listOfRules);
  }

  if (!Number.isInteger(Number(inputValue))) {
    removeRuleConfirm("inter-number", "single", listOfRules);
  } else {
    addRuleConfirm("inter-number", listOfRules);
  }
};

export const removeRuleConfirm = (
  id: string,
  option: string,
  listOfRules: NodeListOf<Element>
): void => {
  listOfRules.forEach((element) => {
    if (option === "single" && id === element.id) {
      element.classList.remove("rule-confirm");
    }

    if (option === "all") {
      element.classList.remove("rule-confirm");
    }
  });
};
