import { finnish } from "./finnish";

const msglist = document.getElementById("msglist");
const btn_finnish = document.getElementById("finalize");
const btn_add = document.getElementById("button");
let numberList: [] = [];

if (btn_add) btn_add.addEventListener("click", toAdd);
if (btn_finnish && msglist)
  btn_finnish.addEventListener("click", () => finnish(msglist, numberList));

function toAdd() {
  msglist.classList.replace("on", "off");

  const number = document.getElementById("inumber");
  const numberValue = number.value;

  if (numberValue == "") {
    alert("ERRO, box empty!");
  } else {
    const numberValue = Number(number.value);

    if (numberValue < 1 || numberValue > 100) {
      alert("ERRO type it a number in between 1 and 100");
    } else {
      const verification = numberList.indexOf(numberValue);
      number.value = "";
      number.focus();

      if (verification != -1) {
        alert`Number ${numberValue} exist at on list or invalid!`;
      } else {
        numberList.push(numberValue);
        numberList.sort((a, b) => a - b);

        let item = document.createElement("Option");
        item.text = `Added ${numberValue} the List! `;

        let list = document.getElementById("number");
        list.appendChild(item);
      }
    }
  }
}
