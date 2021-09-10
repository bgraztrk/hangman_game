const word = document.getElementById('word')
const popupC = document.getElementById('popup-container')
const popup = document.querySelector('.popup')
const messageS = document.getElementById('success-message')
const wrongLetterList = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item')
const message = document.getElementById('message')
const btnPA = document.getElementById('play-again')
const correctLetters =[]
const wrongLetters =[]
let selectedWord = getRandom();

function getRandom(){
    
    const words = ["html","css","javascript","java","mysql","php"]

    return words[Math.floor(Math.random() * words.length)]
}
function displayWord(){

    word.innerHTML = `
        ${selectedWord.split('').map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter: ''}
        </div>
        `).join('')}
    `
    const w = word.innerText.replace(/\n/g,'')
    if(w === selectedWord){
        popupC.style.display = 'flex'
        messageS.innerText = 'congratulations you won'
    }
}
function updateWrongLetters(){
    
    wrongLetterList.innerHTML = `
        ${wrongLetters.length >0 ? '<h3>Wrong Letters</h3>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    items.forEach((item,index) => {
        const errorCount = wrongLetters.length
        if(index<errorCount){
            item.style.display = 'block'
        }else{
            item.style.display = 'none'
        }
    })
    if(wrongLetters.length === items.length){
        popupC.style.display = 'flex'
        popup.style.backgroundColor = 'red'
        messageS.innerText = 'sorry you lost'
    }

}
function displayMessage(){
    
    message.classList.add('show')

    setTimeout(function(){
        message.classList.remove('show')
    },2000)
}
btnPA.addEventListener('click',function(){
    
    correctLetters.splice(0)
    wrongLetters.splice(0)
    selectedWord = getRandom()
    displayWord()
    updateWrongLetters()
    popupC.style.display = 'none'

})
window.addEventListener('keydown',function(e){
    
    letter = e.key

    if(e.keyCode >= 65 && e.keyCode <=90){
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                displayMessage()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()
            }else{
                displayMessage()
            }
        }
    }
})

displayWord()