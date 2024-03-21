import { finnish } from "./finnish";

const msglist = document.getElementById("msglist");
const btn_finnish = document.getElementById("finalize");
const btn_add = document.getElementById("button");
let numberList: number[] = [];

if (btn_add && msglist) {
  btn_add.addEventListener("click", (event) => {
    event?.preventDefault();
    toAdd(msglist, numberList);
  });
}
if (btn_finnish && msglist) {
  btn_finnish.addEventListener("click", (event) => {
    event?.preventDefault();
    finnish(msglist, numberList, sum(numberList), middle(numberList, sum));
  });
}

function toAdd(propsMsglist: HTMLElement, propsNumberList: number[]) {
  propsMsglist.classList.replace("on", "off");

  const input = document.getElementById("inumber");
  const input_value = Number(input?.getAttribute("value"));
  const list = document.getElementById("number");
  const item = document.createElement("Option");
  const verification = propsNumberList.indexOf(input_value);

  if (input_value < 1 || input_value > 100)
    return alert("ERRO type it a number in between 1 and 100");

  if (!input || !input_value || !list) return;

  input.setAttribute("value", "");
  input.focus();

  if (verification != -1)
    return alert(`Number ${input_value} exist at on list or invalid!`);

  numberList.push(input_value);
  sortList(numberList);
  item.textContent = `Added ${input_value} the List! `;

  list.appendChild(item);
}

function sortList(list: number[]) {
  return list.sort((prev: number, next: number) => prev - next);
}

function sum(numbers: number[]) {
  return numbers.reduce((prev: number, current: number) => prev + current);
}

function middle(numbers: number[], sum: Function) {
  return sum(numbers) / numbers.length;
}
