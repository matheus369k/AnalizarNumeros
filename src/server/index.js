var msglist = document.getElementById("msg-container");
var btn_finnish = document.getElementById("finalize");
var btn_add = document.getElementById("submit");
var input = document.getElementById("get-number");
var numberList = [];
btn_add === null || btn_add === void 0 ? void 0 : btn_add.addEventListener("click", function (e) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    console.log(input);
    if (!input)
        return console.log('input undefined');
    if (!msglist)
        return console.log('list message undefined');
    toAdd(msglist, numberList, input);
    input.value = "";
});
if (btn_finnish && msglist) {
    btn_finnish.addEventListener("click", function (e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        finnish(msglist, numberList, sum(numberList), middle(numberList, sum));
    });
}
function toAdd(propsMsglist, propsNumberList, input) {
    propsMsglist.classList.replace("on", "off");
    var input_value = input.value;
    var numbers_container = document.querySelector("#numbers-container>ul");
    var element_li = document.createElement("li");
    if (!input_value)
        return console.log("input value empty!");
    var verification = propsNumberList.indexOf(input_value);
    if (input_value < 1 || input_value > 100)
        return alert("ERRO type it a number in between 1 and 100");
    if (verification != -1 || !numbers_container)
        return alert("Number ".concat(input_value, " exist at on list or invalid!"));
    propsNumberList.push(input_value);
    sortList(propsNumberList);
    element_li.textContent = "".concat(input_value);
    console.log(element_li, numbers_container);
    numbers_container.appendChild(element_li);
}
function finnish(msglist, numberList, sum, average) {
    var inAll = numberList.length;
    var messages = {
        register: "<p>In all,we have <strong>".concat(inAll, "</strong> numbers registered.</p>"),
        large: "<p>The bigger value informed he was: <strong>".concat(numberList[inAll - 1], "</strong></p>"),
        small: "<p>The smaller value informed is: <strong>".concat(numberList[0], "</strong></p>"),
        sum: "<p>adding alls at the values we have: <strong>".concat(sum, "</strong></p>"),
        average: "<p>The average at the values typed is: <strong>".concat(average.toFixed(1), "</strong></p>"),
    };
    if (inAll == 0)
        return alert("add one value!");
    msglist.classList.replace("off", "on");
    for (var ind_chil = 0; ind_chil < Object.values(messages).length; ind_chil++) {
        var message_element = document.getElementById("msg-".concat(Object.keys(messages)[ind_chil]));
        if (message_element)
            message_element.innerHTML = Object.values(messages)[ind_chil];
    }
}
function sortList(list) {
    return list.sort(function (prev, next) { return prev - next; });
}
function middle(numbers, sum) {
    return sum(numbers) / numbers.length;
}
function sum(numbers) {
    return numbers.reduce(function (prev, current) { return prev + current; });
}
