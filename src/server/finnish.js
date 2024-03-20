"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finnish = void 0;
var list_childrens = {
    register: "<p>In all,we have <strong>".concat(inAll, "</strong> numbers registered.</p>"),
    large: "<p>The bigger value informed he was: <strong>".concat(numberList[inAll - 1], "</strong></p>"),
    small: "<p>The smaller value informed is: <strong>".concat(numberList[0], "</strong></p>"),
    sum: "<p>adding alls at the values we have: <strong>".concat(sum, "</strong></p>"),
    average: "<p>The average at the values typed is: <strong>".concat(average.toFixed(1), "</strong></p>"),
};
var finnish = function (msglist, numberList) {
    var inAll = numberList.length;
    if (inAll == 0) {
        alert("add one value!");
    }
    else {
        msglist.classList.replace("off", "on");
        var msglist_childrens = document.querySelectorAll("msglist>li");
        for (var ind_chil = 0; ind_chil > msglist_childrens.length; ind_chil++) {
            var msg = document.getElementById("msg-".concat(Object.keys(list_childrens)[ind_chil]));
        }
        /* document.getElementById(
          "msg-register"
        ).innerHTML = ;
    
        document.getElementById(
          "msg-large"
        ).innerHTML = ;
    
        document.getElementById(
          "msg-small"
        ).innerHTML = ;
    
        let sum = 0;
        for (cont in numberList) {
          sum += numberList[cont];
    
          if (cont == inAll - 1) {
            document.getElementById(
              "msg-sum"
            ).innerHTML = ;
    
            let average = sum / inAll;
            document.getElementById(
              "msg-average"
            ).innerHTML = ;
          }
        } */
    }
};
exports.finnish = finnish;
