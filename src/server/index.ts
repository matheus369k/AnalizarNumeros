const msgList = document.querySelector("#msg-container");
const btnAnalise = document.getElementById("btn-analise");
const btnAdd = document.getElementById("submit");
const input = document.getElementById("get-number");
const btnClose = document.getElementById("btn-close");
const btnsNextPrev = document.querySelectorAll("#numbers-container>button");
const listNumbers = document.querySelector("#numbers-container>ul");
const listOfRules = document.querySelectorAll("#rule>li");
const btnRules = document.getElementById("btn-rules");
const numberList: number[] = [];

btnAdd?.addEventListener("click", (e) => {
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;
  const scrollbarPosition = listNumbers?.scrollLeft
  e?.preventDefault();

  if (input == null || scrollbarPosition === undefined) return;

  if (typeof widthContainer === "number" && typeof widthScroll === "number") {
    hasScollBar(widthContainer, widthScroll);
  }

  if (scrollbarPosition <= 0) showHideElement(btnsNextPrev[0], "show", "hidde");

  toAdd(numberList, input);
  removeRuleConfirm("", "all");

  input.value = "";
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
  
  input.value = "";
  removeRuleConfirm("", "all");
});

btnClose?.addEventListener("click", () => {
  if (msgList == null) return;

  showHideElement(msgList, "show", "hidde");
});

btnClose?.addEventListener("click", () => {
  if (msgList == null) return;

  showHideElement(msgList, "show", "hidde");
});

btnsNextPrev.forEach((btn) => {
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;

  if (typeof widthScroll !== "number" || typeof widthContainer !== "number") return;

  detectScrollPosition();
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

    detectScrollPosition();
  });
});

listNumbers?.addEventListener("scroll", () => {
  detectScrollPosition();
});

input?.addEventListener("input", (e) => {
  verificationRules(e.currentTarget.value);
});

btnRules?.addEventListener("click", () => {
  btnRules.parentNode.classList.toggle("showHider");
});

function addRuleConfirm(id: string): void {
  listOfRules.forEach((element) => {
    if (element.getAttribute("id") === id) {
      element.classList.add("rule-confirm");
    }
  });
}

function toAdd(propsNumberList: number[], input: HTMLElement): void {
  const inputValue: number = parseInt(input.value);
  const numbersContainer = document.querySelector("#numbers-container>ul");
  const elementLi = document.createElement("li");

  const verification = propsNumberList.indexOf(inputValue);

  if (isNaN(inputValue)) return;

  if (inputValue < 1 || inputValue > 100) return;

  if (verification > 0 || numbersContainer == null) return;

  propsNumberList.push(inputValue);
  sortList(propsNumberList);
  elementLi.textContent = `${inputValue}`;

  numbersContainer.appendChild(elementLi);
}

function analiseNumbers(
  propsNumberList: number[],
  propsSum: number,
  propsAverage: number
): void {
  const inAll = propsNumberList.length;
  const messages = {
    register: `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </svg><p>Foram registrados <span>${inAll}</span> numeros ao todo</p>`,
    large: `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </svg><p>O maior numero inserido foi <span>${
      propsNumberList[inAll - 1]
    }</span></p>`,
    small: `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </svg><p>O menor numero inserido foi <span>${propsNumberList[0]}</span></p>`,
    sum: `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </svg><p>A soma de todos os numeros e <span>${propsSum}</span></p>`,
    average: `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </svg><p>A media de todos os numeros e <span>${propsAverage.toFixed(
      1
    )}</span></p>`,
  };

  if (inAll === 0) return;

  for (let indChil = 0; indChil < Object.values(messages).length; indChil++) {
    const messageElement = document.getElementById(
      `msg-${Object.keys(messages)[indChil]}`
    );

    if (messageElement == null) return;

    messageElement.innerHTML = Object.values(messages)[indChil];
  }
}

function showHideElement(
  propsMsgList: Element,
  propsCurrentClass: string,
  propsNewClass: string
): void {
  propsMsgList.classList.replace(propsCurrentClass, propsNewClass);
}

function sortList(list: number[]): number[] {
  return list.sort((prev: number, next: number) => prev - next);
}

function middle(numbers: number[], sum: (numbers: number[]) => number): number {
  return sum(numbers) / numbers.length;
}

function sum(numbers: number[]): number {
  const initialValue = 0;
  const total = numbers.reduce(
    (accumulator: number, current: number) => accumulator + current,
    initialValue
  );
  return total;
}

function hasScollBar(
  propsWidthContainer: number,
  propsWidthScroll: number
): void {
  btnsNextPrev.forEach((btn) => {
    showHideElement(btn, "show", "hidde");
    if (propsWidthScroll === propsWidthContainer) return;
    showHideElement(btn, "hidde", "show");
  });
}

function detectScrollPosition(): void {
  const widthScroll = listNumbers?.scrollWidth;
  const widthContainer = listNumbers?.clientWidth;
  const scrollbarPosition = listNumbers?.scrollLeft;

  console.log(widthScroll)
  console.log(widthContainer)
  console.log(scrollbarPosition)
  if (
    typeof widthScroll === "number" &&
    typeof widthContainer === "number" &&
    typeof scrollbarPosition === "number"
  ) {

    if (scrollbarPosition + widthContainer === widthScroll) {
      showHideElement(btnsNextPrev[1], "show", "hidde");
    }

    if (scrollbarPosition + widthContainer < widthScroll) {
      showHideElement(btnsNextPrev[1], "hidde", "show");
    }

    if (scrollbarPosition === 0) {
      showHideElement(btnsNextPrev[0], "show", "hidde");
    }

    if (scrollbarPosition > 0) {
      showHideElement(btnsNextPrev[0], "hidde", "show");
    }
  }
}

function verificationRules(inputValue: string): void {
  const existNumber = numberList.includes(Number(inputValue));

  if (isNaN(parseInt(inputValue)) || isNaN(parseFloat(inputValue))) {
    removeRuleConfirm("is-valid", "single");
  } else {
    addRuleConfirm("is-valid");
  }

  if (Number(inputValue) < 0) {
    removeRuleConfirm("no-negative", "single");
  } else {
    addRuleConfirm("no-negative");
  }

  if (existNumber) {
    removeRuleConfirm("no-repeat", "single");
  } else {
    addRuleConfirm("no-repeat");
  }

  if (Number(inputValue) < 0 || Number(inputValue) > 100) {
    removeRuleConfirm("one-and-onehundred", "single");
  } else {
    addRuleConfirm("one-and-onehundred");
  }
}

function removeRuleConfirm(id: string, option: string) {
  listOfRules.forEach((element) => {
    if (option === "single" && id === element.id) {
      element.classList.remove("rule-confirm");
    }

    if (option === "all") {
      element.classList.remove("rule-confirm");
    }
  });
}
