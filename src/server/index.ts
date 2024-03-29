const msgList = document.querySelector("#msg-container");
const btnAnalise = document.getElementById("btn-analise");
const btnAdd = document.getElementById("submit");
const input = document.getElementById("get-number");
const btnClose = document.getElementById("btn-close");
const btnsNextPrev = document.querySelectorAll("#numbers-container>button");
const containerListNumbers = document.querySelector("#numbers-container>div");
const listNumbers = document.querySelector("#numbers-container>div>ul");
const numberList: number[] = [];

btnAdd?.addEventListener("click", (e) => {
  const widthScroll = listNumbers?.clientWidth;
  const widthContainer = containerListNumbers?.clientWidth;
  const scrollbarPosition =
    Math.abs(
      Number(listNumbers?.getAttribute("style")?.split(": ")[1].split("px")[0])
    ) || 0;
  e?.preventDefault();

  if (input == null) return;

  if (typeof widthContainer === "number" && typeof widthScroll === "number") {
    hasScollBar(widthContainer, widthScroll);
  }

  if (scrollbarPosition <= 0) showHideElement(btnsNextPrev[0], "show", "hidde");

  toAdd(numberList, input);

  input.value = "";
});

btnAnalise?.addEventListener("click", () => {
  if (msgList == null) return;

  btnAnalise.classList.add("btnLoading");

  setTimeout(() => {
    analiseNumbers(numberList, sum(numberList), middle(numberList, sum));
    showHideElement(msgList, "hidde", "show");

    btnAnalise.classList.remove("btnLoading");
  }, 4000);
})

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
  const widthContainer = containerListNumbers?.clientWidth;

  if (typeof widthScroll === "number" && typeof widthContainer === "number") {
    detectScrollPosition();
    hasScollBar(widthContainer, widthScroll);

    btn.addEventListener("click", () => {
      const btnId = btn.getAttribute("id");
      const widthScroll = listNumbers?.scrollWidth;
      const scrollbarPosition =
        Number(
          listNumbers?.getAttribute("style")?.split(": ")[1].split("px")[0]
        ) || 0;
/* 
      console.log(scrollbarPosition);
      console.log(widthScroll);
      console.log(widthContainer); */

      if (
        typeof scrollbarPosition === "number" &&
        typeof widthScroll === "number"
      ) {
        if (btnId === "btn-prevent") {
          listNumbers?.setAttribute(
            "style",
            `left: ${scrollbarPosition + 100}px`
          );
          /* listNumbers?.scrollTo({
            top: 0,
            left: scrollbarPosition - 100,
            behavior: "smooth"
          }) */
        }
        if (btnId === "btn-next") {
          listNumbers?.setAttribute(
            "style",
            `left: ${scrollbarPosition - 100}px`
          );
          /* listNumbers?.scrollTo({
            top: 0,
            left: scrollbarPosition + 100,
            behavior: "smooth"
          }) */
        }
      }
      detectScrollPosition();
    })
  }
});

listNumbers?.addEventListener("scroll", () => { detectScrollPosition(); })

function toAdd (propsNumberList: number[], input: HTMLElement): void {
  const inputValue: number = parseInt(input.value);
  const numbersContainer = document.querySelector("#numbers-container>div>ul");
  const elementLi = document.createElement("li");

  const verification = propsNumberList.indexOf(inputValue);

  if (inputValue < 1 || inputValue > 100) {
    alert("ERRO type it a number in between 1 and 100");
    return;
  }

  if (verification > 0 || numbersContainer == null) {
    alert(`Number ${inputValue} exist at on list or invalid!`);
    return
  }

  propsNumberList.push(inputValue);
  sortList(propsNumberList);
  elementLi.textContent = `${inputValue}`;

  numbersContainer.appendChild(elementLi);
}

function analiseNumbers (
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
    )}</span></p>`
  };

  if (inAll === 0) {
    alert("add one value!");
    return;
  }

  for (let indChil = 0; indChil < Object.values(messages).length; indChil++) {
    const messageElement = document.getElementById(
      `msg-${Object.keys(messages)[indChil]}`
    );

    if (messageElement == null) return;

    messageElement.innerHTML = Object.values(messages)[indChil];
  }
}

function showHideElement (
  propsMsgList: Element,
  propsCurrentClass: string,
  propsNewClass: string
): void {
  propsMsgList.classList.replace(propsCurrentClass, propsNewClass);
}

function sortList (list: number[]): number[] {
  return list.sort((prev: number, next: number) => prev - next);
}

function middle (numbers: number[], sum: (numbers: number[]) => number): number {
  return sum(numbers) / numbers.length;
}

function sum (numbers: number[]): number {
  const initialValue = 0;
  const total = numbers.reduce(
    (accumulator: number, current: number) => accumulator + current,
    initialValue
  );
  return total;
}

function hasScollBar (
  propsWidthContainer: number,
  propsWidthScroll: number
): void {
  btnsNextPrev.forEach((btn) => {
    showHideElement(btn, "show", "hidde");
    if (propsWidthScroll < propsWidthContainer) return;
    showHideElement(btn, "hidde", "show");
  });
}

function detectScrollPosition () {
  const widthScroll = listNumbers?.clientWidth;
  const widthContainer = containerListNumbers?.clientWidth;
  const scrollbarPosition =
      Number(listNumbers?.getAttribute("style")?.split(": ")[1].split("px")[0])
    || 0;
  if (
    typeof widthScroll === "number" &&
    typeof widthContainer === "number" &&
    typeof scrollbarPosition === "number"
  ) {

    if (widthContainer > widthScroll) return;

    if (Math.abs(scrollbarPosition) + widthContainer > widthScroll) {
      showHideElement(btnsNextPrev[1], "show", "hidde");
      showHideElement(btnsNextPrev[0], "hidde", "show");
      listNumbers?.setAttribute("style", `left: ${widthContainer - widthScroll}px`);
    }

    if (Math.abs(scrollbarPosition) + widthContainer < widthScroll) {
      showHideElement(btnsNextPrev[1], "hidde", "show");
      showHideElement(btnsNextPrev[0], "show", "hidde");
    }

    if (scrollbarPosition > 1) {
      showHideElement(btnsNextPrev[0], "show", "hidde");
      listNumbers?.setAttribute("style", "left: 0px");
    }

    if (scrollbarPosition < 0) {
      showHideElement(btnsNextPrev[0], "hidde", "show");
    }
  }
}
