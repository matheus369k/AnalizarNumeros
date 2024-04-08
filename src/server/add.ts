import { addClass, removeClass } from "./add-remove-toggle";

export const toAdd = (
  numberList: number[],
  inputValue: number
): void => {
  const numbersListContainer = document.querySelector("#numbers-container>ul");
  const numbersContainer = document.getElementById("numbers-container");
  const labelConfirmNumber = document.getElementById("label-confirm-number");
  const btnAnalyze = document.getElementById("btn-analyze");
  const elementLi = document.createElement("li");

  numberList.push(inputValue);
  elementLi.textContent = `${inputValue}`;

  numbersListContainer?.appendChild(elementLi);

  removeClass(numbersContainer, "hide-container");
  removeClass(btnAnalyze, "hide-btn");
  addClass(labelConfirmNumber, "hide-label");
};
