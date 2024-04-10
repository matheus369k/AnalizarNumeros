export const analyzeNumbers = (
  numberList: number[],
  sum: number,
  average: number
): void => {
  const inAll = numberList.length;
  const messages = {
    register: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
      </svg><p>Foram registrados <span>${inAll}</span> numero(s) ao todo</p>`,
    large: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
      </svg><p>O maior numero inserido foi <span>${numberList[inAll - 1]
      }</span></p>`,
    small: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
      </svg><p>O menor numero inserido foi <span>${numberList[0]}</span></p>`,
    sum: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
      </svg><p>A soma de todo(s) o(s) numero(s) e <span>${sum}</span></p>`,
    average: `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
      </svg><p>A media de todo(s) o(s) numero(s) e <span>${average.toFixed(
      1
    )}</span></p>`,
  };

  if (inAll === 0) return;

  for (let indChild = 0; indChild < Object.values(messages).length; indChild++) {
    const messageElement = document.getElementById(
      `msg-${Object.keys(messages)[indChild]}`
    );

    if (messageElement == null) return;

    messageElement.innerHTML = Object.values(messages)[indChild];
  }
}