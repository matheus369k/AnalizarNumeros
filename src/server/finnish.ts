const list_childrens = {
  register: `<p>In all,we have <strong>${inAll}</strong> numbers registered.</p>`,
  large: `<p>The bigger value informed he was: <strong>${
    numberList[inAll - 1]
  }</strong></p>`,
  small: `<p>The smaller value informed is: <strong>${numberList[0]}</strong></p>`,
  sum: `<p>adding alls at the values we have: <strong>${sum}</strong></p>`,
  average: `<p>The average at the values typed is: <strong>${average.toFixed(
    1
  )}</strong></p>`,
};

export const finnish = (msglist: HTMLElement, numberList: []) => {
  const inAll = numberList.length;

  if (inAll == 0) {
    alert("add one value!");
  } else {
    msglist.classList.replace("off", "on");

    const msglist_childrens = document.querySelectorAll("msglist>li");

    for (let ind_chil = 0; ind_chil > msglist_childrens.length; ind_chil++) {
      const msg = document.getElementById(
        `msg-${Object.keys(list_childrens)[ind_chil]}`
      );
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
