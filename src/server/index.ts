const msglist = document.getElementById("msg-container");
const btn_finnish = document.getElementById("finalize");
const btn_add = document.getElementById("submit");
const input = document.getElementById("get-number");
let numberList: number[] = [];

btn_add?.addEventListener("click", (e) => {
  e?.preventDefault();
  console.log(input);

  if (!input) return console.log('input undefined');
  if (!msglist) return  console.log('list message undefined');

  toAdd(msglist, numberList, input);

  input.value="";
});

if (btn_finnish && msglist) {
  btn_finnish.addEventListener("click", (e) => {
    e?.preventDefault();
    finnish(msglist, numberList, sum(numberList), middle(numberList, sum));
  });
}

function toAdd(
  propsMsglist: HTMLElement,
  propsNumberList: number[],
  input: HTMLElement
) {
  propsMsglist.classList.replace("on", "off");

  const input_value = input.value;
  const numbers_container = document.querySelector("#numbers-container>ul");
  const element_li = document.createElement("li");

  if (!input_value) return console.log("input value empty!");

  const verification = propsNumberList.indexOf(input_value);

  if (input_value < 1 || input_value > 100)
    return alert("ERRO type it a number in between 1 and 100");

  if (verification != -1 || !numbers_container)
    return alert(`Number ${input_value} exist at on list or invalid!`);

  propsNumberList.push(input_value);
  sortList(propsNumberList);
  element_li.textContent = `${input_value}`;

  console.log(element_li, numbers_container);
  numbers_container.appendChild(element_li);
}

function finnish(
  msglist: HTMLElement,
  numberList: number[],
  sum: number,
  average: number
) {
  const inAll = numberList.length;
  const messages = {
    register: `<p>In all,we have <strong>${inAll}</strong> numbers registered.</p>`,
    large: `<p>The bigger value informed he was: <strong>${
      numberList[inAll - 1]
    }</strong></p>`,
    small: `<p>The smaller value informed is: <strong>${numberList[0]}</strong></p>`,
    sum: `<p>adding alls at the values we have: <strong>${sum}</strong></p>`,
    average: `<p>The average at the values typed is: <strong>${average.toFixed(
      1
    )}</strong></p>`,
  };

  if (inAll == 0) return alert("add one value!");

  msglist.classList.replace("off", "on");

  for (
    let ind_chil = 0;
    ind_chil < Object.values(messages).length;
    ind_chil++
  ) {
    const message_element = document.getElementById(
      `msg-${Object.keys(messages)[ind_chil]}`
    );

    if (message_element)
      message_element.innerHTML = Object.values(messages)[ind_chil];
  }
}

function sortList(list: number[]) {
  return list.sort((prev: number, next: number) => prev - next);
}
function middle(numbers: number[], sum: Function) {
  return sum(numbers) / numbers.length;
}
function sum(numbers: number[]) {
  return numbers.reduce((prev: number, current: number) => prev + current);
}
