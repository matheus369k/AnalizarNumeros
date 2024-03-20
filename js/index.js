
const msglist = document.getElementById('msglist')
let numberList = []

function finalizar() {
    const inAll = numberList.length

    if (inAll == 0) {
        alert('add one value!')
    } else {
        msglist.classList.replace('off','on')

        document.getElementById('msg-register').innerHTML = `<p>In all,we have <strong>${inAll}</strong> numbers registered.</p>`

        document.getElementById('msg-large').innerHTML = `<p>The bigger value informed he was: <strong>${numberList[inAll-1]}</strong></p>`

        document.getElementById('msg-small').innerHTML = `<p>The smaller value informed is: <strong>${numberList[0]}</strong></p>`


        let sum = 0
        for (cont in numberList){

            sum += numberList[cont]

            if (cont == (inAll-1)) {
                document.getElementById('msg-sum').innerHTML = `<p>adding alls at the values we have: <strong>${sum}</strong></p>`

                let average = sum/inAll
                document.getElementById('msg-average').innerHTML = `<p>The average at the values typed is: <strong>${average.toFixed(1)}</strong></p>`
            }
        }}
}

function toAdd() {
    msglist.classList.replace('on','off')

    const number = document.getElementById('inumber')
    const numberValue = (number.value)

    if (numberValue == '') {
        alert('ERRO, box empty!')

    } else {
        const numberValue = Number(number.value)

        if (numberValue < 1 || numberValue > 100) {
            alert('ERRO type it a number in between 1 and 100')

        } else {
            
            const verification = numberList.indexOf(numberValue)
            number.value = ''
            number.focus()

            if (verification != -1) {
                alert`Number ${numberValue} exist at on list or invalid!`
            } else {
                numberList.push(numberValue)
                numberList.sort((a,b) => a - b);
                
                let item  = document.createElement('Option')
                item.text = `Added ${numberValue} the List! `

                let list = document.getElementById('number')
                list.appendChild(item)              
                
            }}}
}

