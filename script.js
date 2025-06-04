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

section.addEventListener('click',(e)=>{
    if (inputList.includes(e.target)) {
        e.target.addEventListener('input',(e)=>{
            if (e.target.value != "") {
                e.target.previousElementSibling.className = 'not-null'
            } else {
                e.target.previousElementSibling.className = 'null'
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
        ready = inputNode.length
        if (ready == 3) {
            if(e.target.checked) {
                e.target.previousElementSibling.className = 'checked'
                e.target.style.border = 'hidden'
                e.target.nextElementSibling.style.color = '#48a300'
                e.target.nextElementSibling.style.textDecoration = 'line-through'
            } else {
                e.target.previousElementSibling.className = 'unchecked'
                e.target.style.border = '2px solid rgba(97, 72, 28, 1)'
                e.target.nextElementSibling.style.color = ''
                e.target.nextElementSibling.style.textDecoration = ''
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
