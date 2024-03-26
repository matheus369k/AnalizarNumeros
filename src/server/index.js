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
        register: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>Foram registrados <span>".concat(inAll, "</span> numeros ao todo</p>"),
        large: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>O maior numero inserido foi <span>".concat(propsNumberList[inAll - 1], "</span></p>"),
        small: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>O menor numero inserido foi <span>".concat(propsNumberList[0], "</span></p>"),
        sum: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>A soma de todos os numeros e <span>".concat(propsSum, "</span></p>"),
        average: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>A media de todos os numeros e <span>".concat(propsAverage.toFixed(1), "</span></p>")
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
    var total = numbers.reduce(function (accumulator, current) { return accumulator + current; }, initialValue);
    return total;
}
