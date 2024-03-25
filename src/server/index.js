var msgList = document.querySelector('#msg-container');
var btnAnalise = document.getElementById('btn-analise');
var btnAdd = document.getElementById('submit');
var input = document.getElementById('get-number');
var btnClose = document.getElementById('btn-close');
var numberList = [];
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener('click', function (e) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    if (input == null)
        return;
    toAdd(numberList, input);
    input.value = '';
});
btnAnalise === null || btnAnalise === void 0 ? void 0 : btnAnalise.addEventListener('click', function () {
    if (msgList == null)
        return;
    analiseNumbers(numberList, sum(numberList), middle(numberList, sum));
    showHideMessagesList(msgList, 'hidde', 'show');
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener('click', function () {
    if (msgList == null)
        return;
    showHideMessagesList(msgList, 'show', 'hidde');
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener('click', function () {
    if (msgList == null)
        return;
    showHideMessagesList(msgList, 'show', 'hidde');
});
function toAdd(propsNumberList, input) {
    var inputValue = parseInt(input.value);
    var numbersContainer = document.querySelector('#numbers-container>ul');
    var elementLi = document.createElement('li');
    var verification = propsNumberList.indexOf(inputValue);
    if (inputValue < 1 || inputValue > 100) {
        alert('ERRO type it a number in between 1 and 100');
        return;
    }
    if (verification > 0 || numbersContainer == null) {
        alert("Number ".concat(inputValue, " exist at on list or invalid!"));
        return;
    }
    propsNumberList.push(inputValue);
    sortList(propsNumberList);
    elementLi.textContent = "".concat(inputValue);
    numbersContainer.appendChild(elementLi);
}
function analiseNumbers(propsNumberList, propsSum, propsAverage) {
    var inAll = propsNumberList.length;
    var messages = {
        register: "In all,we have <strong>".concat(inAll, "</strong> numbers registered."),
        large: "The bigger value informed he was: <strong>".concat(propsNumberList[inAll - 1], "</strong>"),
        small: "The smaller value informed is: <strong>".concat(propsNumberList[0], "</strong>"),
        sum: "adding alls at the values we have: <strong>".concat(propsSum, "</strong>"),
        average: "The average at the values typed is: <strong>".concat(propsAverage.toFixed(1), "</strong>")
    };
    if (inAll === 0) {
        alert('add one value!');
        return;
    }
    for (var indChil = 0; indChil < Object.values(messages).length; indChil++) {
        var messageElement = document.getElementById("msg-".concat(Object.keys(messages)[indChil]));
        if (messageElement == null)
            return;
        messageElement.innerHTML = Object.values(messages)[indChil];
    }
}
function showHideMessagesList(propsMsgList, propsCurrentClass, propsNewClass) {
    propsMsgList.classList.replace(propsCurrentClass, propsNewClass);
}
function sortList(list) {
    return list.sort(function (prev, next) { return prev - next; });
}
function middle(numbers, sum) {
    return sum(numbers) / numbers.length;
}
function sum(numbers) {
    var initialValue = 0;
    console.log(numbers);
    var total = numbers.reduce(function (accumulator, current) { return accumulator + current; }, initialValue);
    return total;
}
