var msgList = document.querySelector("#msg-container");
var btnAnalise = document.getElementById("btn-analise");
var btnAdd = document.getElementById("submit");
var input = document.getElementById("get-number");
var btnClose = document.getElementById("btn-close");
var btnsNextPrev = document.querySelectorAll("#numbers-container>button");
var containerListNumbers = document.querySelector("#numbers-container>div");
var listNumbers = document.querySelector("#numbers-container>div>ul");
var listOfRules = document.querySelectorAll("#rule>li");
var btnRules = document.getElementById("btn-rules");
var numberList = [];
btnAdd === null || btnAdd === void 0 ? void 0 : btnAdd.addEventListener("click", function (e) {
    var _a;
    var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.clientWidth;
    var widthContainer = containerListNumbers === null || containerListNumbers === void 0 ? void 0 : containerListNumbers.clientWidth;
    var scrollbarPosition = Math.abs(Number((_a = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.getAttribute("style")) === null || _a === void 0 ? void 0 : _a.split(": ")[1].split("px")[0])) || 0;
    e === null || e === void 0 ? void 0 : e.preventDefault();
    if (input == null)
        return;
    if (typeof widthContainer === "number" && typeof widthScroll === "number") {
        hasScollBar(widthContainer, widthScroll);
    }
    if (scrollbarPosition <= 0)
        showHideElement(btnsNextPrev[0], "show", "hidde");
    toAdd(numberList, input);
    input.value = "";
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
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", function () {
    if (msgList == null)
        return;
    showHideElement(msgList, "show", "hidde");
});
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", function () {
    if (msgList == null)
        return;
    showHideElement(msgList, "show", "hidde");
});
btnsNextPrev.forEach(function (btn) {
    var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollWidth;
    var widthContainer = containerListNumbers === null || containerListNumbers === void 0 ? void 0 : containerListNumbers.clientWidth;
    if (typeof widthScroll === "number" && typeof widthContainer === "number") {
        detectScrollPosition();
        hasScollBar(widthContainer, widthScroll);
        btn.addEventListener("click", function () {
            var _a;
            var btnId = btn.getAttribute("id");
            var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.scrollWidth;
            var scrollbarPosition = Number((_a = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.getAttribute("style")) === null || _a === void 0 ? void 0 : _a.split(": ")[1].split("px")[0]) || 0;
            if (typeof scrollbarPosition === "number" &&
                typeof widthScroll === "number") {
                if (btnId === "btn-prevent") {
                    listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.setAttribute("style", "left: ".concat(scrollbarPosition + 100, "px"));
                }
                if (btnId === "btn-next") {
                    listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.setAttribute("style", "left: ".concat(scrollbarPosition - 100, "px"));
                }
            }
            detectScrollPosition();
        });
    }
});
listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.addEventListener("scroll", function () { return detectScrollPosition(); });
input === null || input === void 0 ? void 0 : input.addEventListener("input", function (e) {
    verificationRules(e);
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
    var inputValue = parseInt(input.value);
    var numbersContainer = document.querySelector("#numbers-container>div>ul");
    var elementLi = document.createElement("li");
    var verification = propsNumberList.indexOf(inputValue);
    if (isNaN(inputValue))
        return;
    if (inputValue < 1 || inputValue > 100)
        return;
    if (verification > 0 || numbersContainer == null)
        return;
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
        if (propsWidthScroll < propsWidthContainer)
            return;
        showHideElement(btn, "hidde", "show");
    });
}
function detectScrollPosition() {
    var _a;
    var widthScroll = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.clientWidth;
    var widthContainer = containerListNumbers === null || containerListNumbers === void 0 ? void 0 : containerListNumbers.clientWidth;
    var scrollbarPosition = Number((_a = listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.getAttribute("style")) === null || _a === void 0 ? void 0 : _a.split(": ")[1].split("px")[0])
        || 0;
    if (typeof widthScroll === "number" &&
        typeof widthContainer === "number" &&
        typeof scrollbarPosition === "number") {
        if (widthContainer > widthScroll)
            return;
        if (Math.abs(scrollbarPosition) + widthContainer > widthScroll) {
            showHideElement(btnsNextPrev[1], "show", "hidde");
            showHideElement(btnsNextPrev[0], "hidde", "show");
            listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.setAttribute("style", "left: ".concat(widthContainer - widthScroll, "px"));
        }
        if (Math.abs(scrollbarPosition) + widthContainer < widthScroll) {
            showHideElement(btnsNextPrev[1], "hidde", "show");
            showHideElement(btnsNextPrev[0], "show", "hidde");
        }
        if (scrollbarPosition > 1) {
            showHideElement(btnsNextPrev[0], "show", "hidde");
            listNumbers === null || listNumbers === void 0 ? void 0 : listNumbers.setAttribute("style", "left: 0px");
        }
        if (scrollbarPosition < 0) {
            showHideElement(btnsNextPrev[0], "hidde", "show");
        }
    }
}
function verificationRules(e) {
    var ruleIsValid = document.getElementById("is-valid");
    var ruleNoNegative = document.getElementById("no-negative");
    var ruleNoRepeat = document.getElementById("no-repeat");
    var ruleOneAndOneHundred = document.getElementById("one-and-onehundred");
    var inputValue = e.currentTarget.value;
    var existNumber = numberList.includes(Number(inputValue));
    if (isNaN(parseInt(inputValue)) ||
        isNaN(parseFloat(inputValue))) {
        ruleIsValid === null || ruleIsValid === void 0 ? void 0 : ruleIsValid.classList.remove("rule-confirm");
    }
    else {
        addRuleConfirm("is-valid");
    }
    if (inputValue < 0) {
        ruleNoNegative === null || ruleNoNegative === void 0 ? void 0 : ruleNoNegative.classList.remove("rule-confirm");
    }
    else {
        addRuleConfirm("no-negative");
    }
    if (existNumber) {
        ruleNoRepeat === null || ruleNoRepeat === void 0 ? void 0 : ruleNoRepeat.classList.remove("rule-confirm");
    }
    else {
        addRuleConfirm("no-repeat");
    }
    if (inputValue < 0 || inputValue > 100) {
        ruleOneAndOneHundred === null || ruleOneAndOneHundred === void 0 ? void 0 : ruleOneAndOneHundred.classList.remove("rule-confirm");
    }
    else {
        addRuleConfirm("one-and-onehundred");
    }
}
