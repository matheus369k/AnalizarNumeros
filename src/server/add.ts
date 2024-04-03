import { removeRuleConfirm } from "./rules";
import { sortList } from "./sort";

export const toAdd = (
  numberList: number[],
  input: HTMLElement,
  btnAnalise: Element | null,
  lableComfirmNumber: Element | null,
  listOfRules: NodeListOf<Element>
): void => {
  const inputValue = Number((input as HTMLInputElement).value);
  const numbersListContainer = document.querySelector("#numbers-container>ul");
  const numbersContainer = document.getElementById("numbers-container");
  const elementLi = document.createElement("li");

  if (numbersContainer == null) return;

  numberList.push(inputValue);
  sortList(numberList);
  elementLi.textContent = `${inputValue}`;

  removeRuleConfirm("", "all", listOfRules);

  (input as HTMLInputElement).value = "";

  numbersListContainer?.appendChild(elementLi);

  numbersContainer?.classList.remove("hidde-container");
  btnAnalise?.classList.remove("hidde-btn");
  lableComfirmNumber?.classList.add("hidde-lable");
};
