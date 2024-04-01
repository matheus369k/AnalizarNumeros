var msgList = document.querySelector("#msg-container");
var btnAnalise = document.getElementById("btn-analise");
var btnAdd = document.getElementById("submit");
var input = document.getElementById("get-number");
var btnClose = document.getElementById("btn-close");
var btnsNextPrev = document.querySelectorAll("#numbers-container>button");
var listNumbers = document.querySelector("#numbers-container>ul");
var listOfRules = document.querySelectorAll("#rule>li");
var btnRules = document.getElementById("btn-rules");
var numberList = [];
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener("click", function (e) {
    var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollWidth;
    var widthContainer = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.clientWidth;
    var scrollbarPosition = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollLeft;
    e === null || e === void 0 ? void 0 : e.preventDefault();
    if (input == null || scrollbarPosition === undefined)
        return;
    if (typeof widthContainer === "number" && typeof widthScroll === "number") {
        hasScollBar(widthContainer, widthScroll);
    }
    if (scrollbarPosition <= 0)
        showHideElement(btnsNextPrev[0], "show", "hidde");
    toAdd(numberList, input);
});
btnAnalise === null || btnAnalise === void 0 ? void 0 : btnAnalise.addEventListener("click", function () {
    if (msgList == null)
        return;
    if (numberList.length === 0)
        return;
    btnAnalise.classList.add("btnLoading");
    setTimeout(function () {
        analiseNumbers(numberList, sum(numberList), middle(numberList, sum));
        showHideElement(msgList, "hidde", "show");
        btnAnalise.classList.remove("btnLoading");
    }, 4000);
    input.value = "";
    removeRuleConfirm("", "all");
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", function () {
    if (msgList == null)
        return;
    showHideElement(msgList, "show", "hidde");
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", function () {
    var _a;
    var numbersChildren = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.childElementCount;
    var elementsChildren = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.childNodes;
    if (msgList == null)
        return;
    showHideElement(msgList, "show", "hidde");
    if (numbersChildren === undefined || elementsChildren === undefined)
        return;
    for (var count = numbersChildren - 1; count > -1; count--) {
        elementsChildren[count].remove();
    }
    (_a = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.parentNode) === null || _a === void 0 ? void 0 : _a.classList.add("hidde-container");
    btnAnalise === null || btnAnalise === void 0 ? void 0 : btnAnalise.classList.add("hidde-btn");
});
btnsNextPrev.forEach(function (btn) {
    var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollWidth;
    var widthContainer = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.clientWidth;
    if (typeof widthScroll !== "number" || typeof widthContainer !== "number")
        return;
    detectScrollPosition();
    hasScollBar(widthContainer, widthScroll);
    btn.addEventListener("click", function () {
        var btnId = btn.getAttribute("id");
        var scrollbarPosition = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollLeft;
        if (typeof scrollbarPosition !== "number")
            return;
        if (btnId === "btn-prevent") {
            listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollTo({
                top: 0,
                left: scrollbarPosition - 100,
                behavior: "smooth",
            });
        }
        if (btnId === "btn-next") {
            listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollTo({
                top: 0,
                left: scrollbarPosition + 100,
                behavior: "smooth",
            });
        }
        detectScrollPosition();
    });
});
listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.addEventListener("scroll", function () {
    detectScrollPosition();
});
input === null || input === void 0 ? void 0 : input.addEventListener("input", function (e) {
    verificationRules(e.currentTarget.value);
});
btnRules === null || btnRules === void 0 ? void 0 : btnRules.addEventListener("click", function () {
    btnRules.parentNode.classList.toggle("showHider");
});
function addRuleConfirm(id) {
    listOfRules.forEach(function (element) {
        if (element.getAttribute("id") === id) {
            element.classList.add("rule-confirm");
        }
    });
}
function toAdd(propsNumberList, input) {
    var _a;
    var inputValue = parseInt(input.value);
    var numbersContainer = document.querySelector("#numbers-container>ul");
    var elementLi = document.createElement("li");
    var verification = propsNumberList.includes(inputValue);
    if (isNaN(inputValue))
        return;
    if (inputValue < 1 || inputValue > 100)
        return;
    if (verification || numbersContainer == null)
        return;
    propsNumberList.push(inputValue);
    sortList(propsNumberList);
    elementLi.textContent = "".concat(inputValue);
    removeRuleConfirm("", "all");
    input.value = "";
    numbersContainer.appendChild(elementLi);
    (_a = numbersContainer.parentNode) === null || _a === void 0 ? void 0 : _a.classList.remove("hidde-container");
    btnAnalise === null || btnAnalise === void 0 ? void 0 : btnAnalise.classList.remove("hidde-btn");
}
function analiseNumbers(propsNumberList, propsSum, propsAverage) {
    var inAll = propsNumberList.length;
    var messages = {
        register: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>Foram registrados <span>".concat(inAll, "</span> numero(s) ao todo</p>"),
        large: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>O maior numero inserido foi <span>".concat(propsNumberList[inAll - 1], "</span></p>"),
        small: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>O menor numero inserido foi <span>".concat(propsNumberList[0], "</span></p>"),
        sum: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>A soma de todo(s) o(s) numero(s) e <span>".concat(propsSum, "</span></p>"),
        average: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n    <svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path fill=\"#444\" d=\"M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z\"></path>\n    </svg><p>A media de todo(s) o(s) numero(s) e <span>".concat(propsAverage.toFixed(1), "</span></p>"),
    };
    if (inAll === 0)
        return;
    for (var indChil = 0; indChil < Object.values(messages).length; indChil++) {
        var messageElement = document.getElementById("msg-".concat(Object.keys(messages)[indChil]));
        if (messageElement == null)
            return;
        messageElement.innerHTML = Object.values(messages)[indChil];
    }
}
function showHideElement(propsMsgList, propsCurrentClass, propsNewClass) {
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
function hasScollBar(propsWidthContainer, propsWidthScroll) {
    btnsNextPrev.forEach(function (btn) {
        showHideElement(btn, "show", "hidde");
        if (propsWidthScroll === propsWidthContainer)
            return;
        showHideElement(btn, "hidde", "show");
    });
}
function detectScrollPosition() {
    var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollWidth;
    var widthContainer = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.clientWidth;
    var scrollbarPosition = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollLeft;
    if (typeof widthScroll === "number" &&
        typeof widthContainer === "number" &&
        typeof scrollbarPosition === "number") {
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
function verificationRules(inputValue) {
    var existNumber = numberList.includes(Number(inputValue));
    if (isNaN(parseInt(inputValue)) || isNaN(parseFloat(inputValue))) {
        removeRuleConfirm("is-valid", "single");
    }
    else {
        addRuleConfirm("is-valid");
    }
    if (Number(inputValue) < 0) {
        removeRuleConfirm("no-negative", "single");
    }
    else {
        addRuleConfirm("no-negative");
    }
    if (existNumber) {
        removeRuleConfirm("no-repeat", "single");
    }
    else {
        addRuleConfirm("no-repeat");
    }
    if (Number(inputValue) < 0 || Number(inputValue) > 100) {
        removeRuleConfirm("one-and-onehundred", "single");
    }
    else {
        addRuleConfirm("one-and-onehundred");
    }
}
function removeRuleConfirm(id, option) {
    listOfRules.forEach(function (element) {
        if (option === "single" && id === element.id) {
            element.classList.remove("rule-confirm");
        }
        if (option === "all") {
            element.classList.remove("rule-confirm");
        }
    });
}
