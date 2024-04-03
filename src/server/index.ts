const { toAdd } = require("./add");
const { analiseNumbers } = require("./analise");
const { middle, sum } = require("./calc");
const { removeRuleConfirm, verificationRules } = require("./rules");
const {
  detectScrollPosition,
  hasScollBar,
  showHideElement,
} = require("./scroll");
require("../style/scss/index.scss");

const msgList = document.querySelector("#msg-container");
const btnAnalise = document.getElementById("btn-analise");
const btnAdd = document.getElementById("submit");
const input = document.getElementById("get-number");
const btnClose = document.getElementById("btn-close");
const btnsNextPrev = document.querySelectorAll("#numbers-container>button");
const listNumbers = document.querySelector("#numbers-container>ul");
const containerListNumbers = document.getElementById("numbers-container");
const listOfRules = document.querySelectorAll("#rule>li");
const constainerListOfRules = document.querySelector(".rules-container");
const btnRules = document.getElementById("btn-rules");
const lableComfirmNumber = document.getElementById("lable-comfirm-number");
const numberList: number[] = [];

btnAdd?.addEventListener("click", (e) => {
  const allConfirmRules = document.querySelectorAll(".rule-confirm");
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;
  const scrollbarPosition = listNumbers?.scrollLeft;
  e?.preventDefault();

  if (input == null || scrollbarPosition === undefined) return;

  if (typeof widthContainer === "number" && typeof widthScroll === "number") {
    hasScollBar(widthContainer, widthScroll);
  }

  if (scrollbarPosition <= 0) showHideElement(btnsNextPrev[0], "show", "hidde");

  if (allConfirmRules.length === listOfRules.length) {
    toAdd(numberList, input, btnAnalise, lableComfirmNumber, listOfRules);
  }
});

btnAnalise?.addEventListener("click", () => {
  if (msgList == null) return;
  if (numberList.length === 0) return;

  btnAnalise.classList.add("btnLoading");

  setTimeout(() => {
    analiseNumbers(numberList, sum(numberList), middle(numberList, sum));

    showHideElement(msgList, "hidde", "show");

    btnAnalise.classList.remove("btnLoading");
  }, 4000);

  if (input) (input as HTMLInputElement).value = "";
  removeRuleConfirm("", "all", listOfRules);
});

btnClose?.addEventListener("click", () => {
  if (msgList == null) return;

  showHideElement(msgList, "show", "hidde");
});

btnClose?.addEventListener("click", () => {
  const numbersChildren = listNumbers?.childElementCount;
  const elementsChildren = listNumbers?.childNodes;
  if (msgList == null) return;

  showHideElement(msgList, "show", "hidde");

  if (numbersChildren === undefined || elementsChildren === undefined) return;

  for (let count = numbersChildren - 1; count > -1; count--) {
    elementsChildren[count].remove();
  }

  containerListNumbers?.classList.add("hidde-container");
  btnAnalise?.classList.add("hidde-btn");
});

btnsNextPrev.forEach((btn) => {
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;

  if (typeof widthScroll !== "number" || typeof widthContainer !== "number")
    return;

  detectScrollPosition(listNumbers);
  hasScollBar(widthContainer, widthScroll);

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

    detectScrollPosition(listNumbers);
  });
});

listNumbers?.addEventListener("scroll", () => {
  detectScrollPosition(listNumbers);
});

input?.addEventListener("input", () => {
  const inputValue = (input as HTMLInputElement).value;
  if (inputValue) verificationRules(inputValue, numberList, listOfRules);
  const allConfirmRules = document.querySelectorAll(".rule-confirm");

  if (allConfirmRules.length === listOfRules.length) {
    lableComfirmNumber?.classList.remove("hidde-lable");
  } else {
    lableComfirmNumber?.classList.add("hidde-lable");
  }
});

btnRules?.addEventListener("click", () => {
  constainerListOfRules?.classList.toggle("showHider");
});
