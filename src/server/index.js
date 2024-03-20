"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var finnish_1 = require("./finnish");
var msglist = document.getElementById("msglist");
var btn_finnish = document.getElementById("finalize");
var btn_add = document.getElementById("button");
var numberList = [];
if (btn_add)
    btn_add.addEventListener("click", toAdd);
if (btn_finnish && msglist)
    btn_finnish.addEventListener("click", function () { return (0, finnish_1.finnish)(msglist, numberList); });
function toAdd() {
    msglist.classList.replace("on", "off");
    var number = document.getElementById("inumber");
    var numberValue = number.value;
    if (numberValue == "") {
        alert("ERRO, box empty!");
    }
    else {
        var numberValue_1 = Number(number.value);
        if (numberValue_1 < 1 || numberValue_1 > 100) {
            alert("ERRO type it a number in between 1 and 100");
        }
        else {
            var verification = numberList.indexOf(numberValue_1);
            number.value = "";
            number.focus();
            if (verification != -1) {
                alert(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Number ", " exist at on list or invalid!"], ["Number ", " exist at on list or invalid!"])), numberValue_1);
            }
            else {
                numberList.push(numberValue_1);
                numberList.sort(function (a, b) { return a - b; });
                var item = document.createElement("Option");
                item.text = "Added ".concat(numberValue_1, " the List! ");
                var list = document.getElementById("number");
                list.appendChild(item);
            }
        }
    }
}
var templateObject_1;
