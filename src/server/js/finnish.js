function finnish(msglist, numberList, sum, average) {
    var _a;
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
    for (var ind_chil = 0; ind_chil > Object(messages).length; ind_chil++) {
        var msg = document.createElement("p");
        msg.textContent = "msg-".concat(Object.keys(messages)[ind_chil]);
        (_a = document.getElementById("msg-register")) === null || _a === void 0 ? void 0 : _a.appendChild(msg);
    }
}
;
module.exports = finnish;
