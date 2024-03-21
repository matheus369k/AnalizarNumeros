function finnish(
  msglist: HTMLElement,
  numberList: number[],
  sum: number,
  average: number
){
  const inAll = numberList.length;
  const messages = {
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

  if (inAll == 0) return alert("add one value!");

  msglist.classList.replace("off", "on");

  for (let ind_chil = 0; ind_chil > Object(messages).length; ind_chil++) {
    const msg = document.createElement("p");
    msg.textContent = `msg-${Object.keys(messages)[ind_chil]}`;
    document.getElementById("msg-register")?.appendChild(msg);
  }
};

module.exports = finnish;
