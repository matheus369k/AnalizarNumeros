require("../style/index.scss");

import { addClass, removeClass, toggleClass } from "./add-remove-toggle";
import { orderList } from "./order-list";
import { delDataOnTheUrlState, getDataOnTheUrlState, setDataOnTheUrlState } from "./url-state";
import { toAdd } from "./add";
import { analyzeNumbers } from "./analyze";
import { media, sum } from "./calc";
import { removeRuleConfirm, verificationRules } from "./rules";
import { detectScrollPosition, showHideElement } from "./scroll";

const msgList = document.querySelector("#msg-container");
const btnAnalyze = document.getElementById("btn-analyze");
const btnAdd = document.getElementById("submit");
const input = (document.getElementById("get-number") as HTMLInputElement);
const btnClose = document.getElementById("btn-close");
const buttonsNextPrev = document.querySelectorAll("#numbers-container>button");
const listNumbers = document.querySelector("#numbers-container>ul");
const listOfRules = document.querySelectorAll("#rule>li");
const btnRules = document.getElementById("btn-rules");
const labelConfirmNumber = document.getElementById("label-confirm-number");
let numberList: number[] = [];

window.addEventListener("load", () => {
  getDataOnTheUrlState()?.listOfNumber.forEach(number => {
    toAdd(numberList, Number(number));

    if (getDataOnTheUrlState()?.analiseState === 'true') {
      btnAnalyze?.click()
    }
  });
  
  detectScrollPosition(
    listNumbers?.scrollWidth,
    listNumbers?.clientWidth,
    listNumbers?.scrollLeft
  );
  removeClass(document.body, "loading")
});

btnAdd?.addEventListener("click", (e) => {
  const allConfirmRules = document.querySelectorAll(".rule-confirm");
  const inputValue = Number(input.value);

  e?.preventDefault();

  if (input == null) return;

  if (allConfirmRules.length === listOfRules.length) {
    toAdd(numberList, inputValue);
    removeRuleConfirm("", "all");
    setDataOnTheUrlState("list", numberList);

    input.value = "";
  }
  
  detectScrollPosition(
    listNumbers?.scrollWidth,
    listNumbers?.clientWidth,
    listNumbers?.scrollLeft
  );
});

btnAnalyze?.addEventListener("click", () => {
  const numbersSum = sum(numberList);
  const numberMedia = media(numberList, numbersSum);

  if (numberList.length === 0) return;

  addClass(btnAnalyze, "btnLoading");
  orderList(numberList);

  setTimeout(() => {
    analyzeNumbers(numberList, numbersSum, numberMedia);
    setDataOnTheUrlState("analise", true);

    showHideElement(msgList, "hide", "show");

    removeClass(btnAnalyze, "btnLoading");
  }, 1000);

  if (input) (input as HTMLInputElement).value = "";
  removeRuleConfirm("", "all");
  addClass(labelConfirmNumber, "hide-label");
});

btnClose?.addEventListener("click", () => {
  const containerListNumbers = document.getElementById("numbers-container");
  const numbersChildren = listNumbers?.childElementCount;
  const elementsChildren = listNumbers?.childNodes;

  if (msgList == null) return;

  showHideElement(msgList, "show", "hide");
  setDataOnTheUrlState("analise", false)

  if (numbersChildren === undefined || elementsChildren === undefined) return;

  for (let count = numbersChildren - 1; count > -1; count--) {
    elementsChildren[count].remove();
  }

  numberList = []

  addClass(containerListNumbers, "hide-container");
  addClass(btnAnalyze, "hide-btn");
  delDataOnTheUrlState("list");
});

buttonsNextPrev.forEach((btn) => {
  detectScrollPosition(
    listNumbers?.scrollWidth,
    listNumbers?.clientWidth,
    listNumbers?.scrollLeft,
  );

  btn.addEventListener("click", () => {
    const btnId = btn.getAttribute("id");
    const scrollbarPosition = listNumbers?.scrollLeft;

    if (typeof scrollbarPosition !== "number") return;

    if (btnId === "btn-prevent") {
      listNumbers?.scrollTo({
        top: 0,
        left: scrollbarPosition - 100,
        behavior: "smooth",
      });
    }

    if (btnId === "btn-next") {
      listNumbers?.scrollTo({
        top: 0,
        left: scrollbarPosition + 100,
        behavior: "smooth",
      });
    }
  });
});

listNumbers?.addEventListener("scroll", () => {
  detectScrollPosition(
    listNumbers?.scrollWidth,
    listNumbers?.clientWidth,
    listNumbers?.scrollLeft
  );
});

input?.addEventListener("input", () => {
  const inputValue = Number((input as HTMLInputElement).value);

  verificationRules(inputValue, numberList);

  const allConfirmRules = document.querySelectorAll(".rule-confirm");

  if (allConfirmRules.length === listOfRules.length) {
    removeClass(labelConfirmNumber, "hide-label")
  } else {
    addClass(labelConfirmNumber, "hide-label");
  }
});

btnRules?.addEventListener("click", () => {
  const containerListOfRules = document.querySelector(".rules-container");
  toggleClass(containerListOfRules, "showHide");
});