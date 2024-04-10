import { addClass, removeClass, toggleClass } from "./add-remove-toggle";
import { orderList } from "./order-list";
import { delDataOnTheUrlState, getDataOnTheUrlState, setDataOnTheUrlState } from "./url-state";
import { toAdd } from "./add";
import { analyzeNumbers } from "./analyze";
import { media, sum } from "./calc";
import { removeRuleConfirm, verificationRules } from "./rules";
import { detectScrollPosition, hasScrollBar, showHideElement } from "./scroll";
require("../style/index.scss");

const msgList = document.querySelector("#msg-container");
const btnAnalyze = document.getElementById("btn-analyze");
const btnAdd = document.getElementById("submit");
const input = (document.getElementById("get-number") as HTMLInputElement);
const btnClose = document.getElementById("btn-close");
const buttonsNextPrev = document.querySelectorAll("#numbers-container>button");
const listNumbers = document.querySelector("#numbers-container>ul");
const containerListNumbers = document.getElementById("numbers-container");
const listOfRules = document.querySelectorAll("#rule>li");
const containerListOfRules = document.querySelector(".rules-container");
const btnRules = document.getElementById("btn-rules");
const labelConfirmNumber = document.getElementById("label-confirm-number");
let numberList: number[] = [];

btnAdd?.addEventListener("click", (e) => {
  const allConfirmRules = document.querySelectorAll(".rule-confirm");
  const inputValue = Number(input.value);
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;
  const scrollbarPosition = listNumbers?.scrollLeft;

  e?.preventDefault();
  console.log(numberList)

  if (input == null || scrollbarPosition === undefined) return;

  if (allConfirmRules.length === listOfRules.length) {
    toAdd(numberList, inputValue);
    removeRuleConfirm("", "all");
    setDataOnTheUrlState("list" ,numberList);

    input.value = "";
  }

  if (typeof widthContainer === "number" && typeof widthScroll === "number") {
    hasScrollBar(widthContainer, widthScroll);
  }

  if (scrollbarPosition <= 0) {
    showHideElement(buttonsNextPrev[0], "show", "hide");
  }
});

btnAnalyze?.addEventListener("click", () => {
  const numbersSum = sum(numberList);
  const numberMedia = media(numberList, numbersSum);

  if (numberList.length === 0) return;

  addClass(btnAnalyze, "btnLoading");
  orderList(numberList);

  setTimeout(() => {
    analyzeNumbers(numberList, numbersSum, numberMedia);
    setDataOnTheUrlState("analise", true)

    showHideElement(msgList, "hide", "show");

    removeClass(btnAnalyze, "btnLoading");
  }, 2000);

  if (input) (input as HTMLInputElement).value = "";
  removeRuleConfirm("", "all");
  addClass(labelConfirmNumber, "hide-label");
});

btnClose?.addEventListener("click", () => {
  if (msgList == null) return;

  showHideElement(msgList, "show", "hide");
  setDataOnTheUrlState("analise", false)
});

btnClose?.addEventListener("click", () => {
  const numbersChildren = listNumbers?.childElementCount;
  const elementsChildren = listNumbers?.childNodes;

  if (msgList == null) return;

  showHideElement(msgList, "show", "hide");

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
  let widthScroll = listNumbers?.scrollWidth;
  let widthContainer = listNumbers?.clientWidth;

  if (typeof widthScroll !== "number" || typeof widthContainer !== "number") return;

  detectScrollPosition(
    widthScroll,
    widthContainer,
    listNumbers?.scrollLeft
  );
  hasScrollBar(widthContainer, widthScroll);

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

    detectScrollPosition(
      listNumbers?.scrollWidth,
      listNumbers?.clientWidth,
      listNumbers?.scrollLeft
    );
  });
});

listNumbers?.addEventListener("scroll", () => {
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;
  const scrollbarPosition = listNumbers?.scrollLeft;

  detectScrollPosition(widthScroll, widthContainer, scrollbarPosition);
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
  toggleClass(containerListOfRules, "showHide");
});

window.addEventListener("load", () => {

  getDataOnTheUrlState()?.listOfNumber.forEach(number => {
    toAdd(numberList, Number(number));

    if (getDataOnTheUrlState()?.analiseState){
      btnAnalyze?.click()
    }
  });
});