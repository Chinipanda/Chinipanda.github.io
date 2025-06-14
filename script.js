const body = document.querySelector('body')
const section = document.querySelector('section')
const secondPara = document.querySelector('.second-p')
const inputSpan = document.querySelectorAll('.input span')
const input = document.querySelectorAll('input[type="text"]')
const checkBox = document.querySelectorAll('input[type=checkbox]')
const barElement = document.querySelector('.bar')
const bar = document.querySelector('.bar span')

const inputSpanList = [...inputSpan]
const checkBoxList = [...checkBox]
const inputList = [...input]

let inputData = JSON.parse(localStorage.getItem('inputData')) || {}
let checkedBoxes = JSON.parse(localStorage.getItem('checkedBoxes')) || {}

section.addEventListener('click',(e)=>{
    if (inputList.includes(e.target)) {
        e.target.addEventListener('input',(e)=>{
            if (e.target.value != "") {
                e.target.previousElementSibling.className = 'not-null'
                const inputName = e.target.name
                inputData[inputName] = `${e.target.value}`
                localStorage.setItem('inputData', JSON.stringify(inputData))
            } else {
                e.target.previousElementSibling.className = 'null'
                for (inputStyle of input) {
                    inputStyle.removeAttribute('style')
                }
                bar.style.width = '0px'
                bar.firstElementChild.innerText = '0/3 Completed'
                bar.firstElementChild.style.color = 'black'
                delete inputData[e.target.name]
                localStorage.setItem('inputData',JSON.stringify(inputData))
                for(inputSpanElement of inputSpanList) {
                    inputSpanElement.className = 'unchecked'
                }
                for(checkBoxElement of checkBoxList) {
                    checkBoxElement.style.border = ''
                }
            }
        })
    } else if(checkBoxList.includes(e.target)) {
        const inputNode = document.querySelectorAll('.not-null')
        const ready = inputNode.length
        if (ready == 3) {
            if(e.target.checked) {
                e.target.previousElementSibling.className = 'checked'
                e.target.style.border = 'hidden'
                e.target.nextElementSibling.style.color = '#48a300'
                e.target.nextElementSibling.style.textDecoration = 'line-through'
                    checkedBoxes[e.target.name] = 'checked'
                    localStorage.setItem('checkedBoxes', JSON.stringify(checkedBoxes))
                
            } else {
                e.target.previousElementSibling.className = 'unchecked'
                e.target.style.border = '2px solid rgba(97, 72, 28, 1)'
                e.target.nextElementSibling.style.color = ''
                e.target.nextElementSibling.style.textDecoration = ''
                delete checkedBoxes[e.target.name]
                localStorage.setItem('checkedBoxes', JSON.stringify(checkedBoxes))
            }
        } else {
            secondPara.style.display = 'block'
        }
        
        const checkedLength = document.querySelectorAll('.checked')
        const barWidth = barElement.offsetWidth
        bar.style.width = `${Math.ceil(barWidth/3*checkedLength.length)}px`
        bar.firstElementChild.innerText = `${checkedLength.length}/3 Completed`
        if(checkedLength.length>0 && barWidth>333) {
                bar.firstElementChild.style.color = '#fbfbfb'
        } else {
            bar.firstElementChild.style.color = 'black'
        }

    }
})

body.addEventListener('click', (e)=> {
    if (!checkBoxList.includes(e.target)) {
        secondPara.style.display = 'none'
    }
})


if (inputData) {
    for (inputElement of inputList) {
        for (inputObject in inputData) {
            if (inputElement.name==inputObject) {
                inputElement.value = inputData[inputObject]
                inputElement.previousElementSibling.className = 'not-null'
            }
        }
    }
}

if (checkedBoxes) {
    for (checkElement of checkBoxList) {
        for (boxName in checkedBoxes) {
            if (checkElement.name==boxName) {
                checkElement.click()
            }
        }
    }
}
