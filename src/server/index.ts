const msgList = document.querySelector('#msg-container')
const btnAnalise = document.getElementById('btn-analise')
const btnAdd = document.getElementById('submit')
const input = document.getElementById('get-number')
const btnClose = document.getElementById('btn-close')
const numberList: number[] = []

btnAdd?.addEventListener('click', (e) => {
  e?.preventDefault()

  if (input == null) return

  toAdd(numberList, input)

  input.value = ''
})

btnAnalise?.addEventListener('click', () => {
  if (msgList == null) return

  analiseNumbers(numberList, sum(numberList), middle(numberList, sum))
  showHideMessagesList(msgList, 'hidde', 'show')
})

btnClose?.addEventListener('click', () => {
  if (msgList == null) return

  showHideMessagesList(msgList, 'show', 'hidde')
})

btnClose?.addEventListener('click', () => {
  if (msgList == null) return

  showHideMessagesList(msgList, 'show', 'hidde')
})

function toAdd (
  propsNumberList: number[],
  input: HTMLElement
): void {
  const inputValue: number = parseInt(input.value)
  const numbersContainer = document.querySelector('#numbers-container>ul')
  const elementLi = document.createElement('li')

  const verification = propsNumberList.indexOf(inputValue)

  if (inputValue < 1 || inputValue > 100) { alert('ERRO type it a number in between 1 and 100'); return }

  if (verification > 0 || numbersContainer == null) { alert(`Number ${inputValue} exist at on list or invalid!`); return }

  propsNumberList.push(inputValue)
  sortList(propsNumberList)
  elementLi.textContent = `${inputValue}`

  numbersContainer.appendChild(elementLi)
}

function analiseNumbers (
  propsNumberList: number[],
  propsSum: number,
  propsAverage: number
): void {
  const inAll = propsNumberList.length
  const messages = {
    register: `In all,we have <strong>${inAll}</strong> numbers registered.`,
    large: `The bigger value informed he was: <strong>${
      propsNumberList[inAll - 1]
    }</strong>`,
    small: `The smaller value informed is: <strong>${propsNumberList[0]}</strong>`,
    sum: `adding alls at the values we have: <strong>${propsSum}</strong>`,
    average: `The average at the values typed is: <strong>${propsAverage.toFixed(
      1
    )}</strong>`
  }

  if (inAll === 0) { alert('add one value!'); return }

  for (
    let indChil = 0;
    indChil < Object.values(messages).length;
    indChil++
  ) {
    const messageElement = document.getElementById(
      `msg-${Object.keys(messages)[indChil]}`
    )

    if (messageElement == null) return

    messageElement.innerHTML = Object.values(messages)[indChil]
  }
}

function showHideMessagesList (
  propsMsgList: Element,
  propsCurrentClass: string,
  propsNewClass: string
): void {
  propsMsgList.classList.replace(propsCurrentClass, propsNewClass)
}

function sortList (list: number[]): number[] {
  return list.sort((prev: number, next: number) => prev - next)
}

function middle (numbers: number[], sum: (numbers: number[]) => number): number {
  return sum(numbers) / numbers.length
}

function sum (numbers: number[]): number {
  const initialValue = 0
  console.log(numbers)
  const total = numbers.reduce(
    (accumulator: number, current: number) => accumulator + current,
    initialValue
  )
  return total
}
