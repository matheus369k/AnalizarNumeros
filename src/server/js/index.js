"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finnish_1 = require("./finnish");
var msglist = document.getElementById("msglist");
var btn_finnish = document.getElementById("finalize");
var btn_add = document.getElementById("button");
var numberList = [];
if (btn_add && msglist) {
    btn_add.addEventListener("click", function (event) {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        toAdd(msglist, numberList);
    });
}
if (btn_finnish && msglist) {
    btn_finnish.addEventListener("click", function (event) {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        (0, finnish_1.finnish)(msglist, numberList, sum(numberList), middle(numberList, sum));
    });
}
function toAdd(propsMsglist, propsNumberList) {
    propsMsglist.classList.replace("on", "off");
    var input = document.getElementById("inumber");
    var input_value = Number(input === null || input === void 0 ? void 0 : input.getAttribute("value"));
    var list = document.getElementById("number");
    var item = document.createElement("Option");
    var verification = propsNumberList.indexOf(input_value);
    if (input_value < 1 || input_value > 100)
        return alert("ERRO type it a number in between 1 and 100");
    if (!input || !input_value || !list)
        return;
    input.setAttribute("value", "");
    input.focus();
    if (verification != -1)
        return alert("Number ".concat(input_value, " exist at on list or invalid!"));
    numberList.push(input_value);
    sortList(numberList);
    item.textContent = "Added ".concat(input_value, " the List! ");
    list.appendChild(item);
}
function sortList(list) {
    return list.sort(function (prev, next) { return prev - next; });
}
function sum(numbers) {
    return numbers.reduce(function (prev, current) { return prev + current; });
}
function middle(numbers, sum) {
    return sum(numbers) / numbers.length;
}
