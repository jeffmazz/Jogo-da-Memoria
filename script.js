const mainContainer = document.getElementById("mainContainer")

const winDiv = document.querySelector('.win')
const winBtn = document.getElementById('winBtn')
const loseDiv = document.querySelector('.lose')
const loseBtn = document.getElementById('loseBtn')

const btnWithoutTimer = document.getElementById('withoutTimer')

const btnWithTimer = document.getElementById('withTimer')

const title = document.querySelector('.title')
const timer = document.querySelector('.timer')

const divs = mainContainer.children

const arrayDivs = Array.from(divs)

let firstChoice = ""
let secondChoice = ""

const gameMethods = document.getElementById('gameMethods')

function shuffle() {
    arrayDivs.sort(() => Math.random() - 0.5)
    arrayDivs.forEach(div => {
        mainContainer.appendChild(div)
    })
    
    firstChoice = ""
    secondChoice = ""
}

window.addEventListener('load', shuffle())

arrayDivs.forEach(div => {
    
    div.addEventListener('click', () => {
        
        div.classList.add('opened')
        div.children[0].style.display = 'block'
        div.children[1].style.display = 'none'
        
        if(firstChoice == "") {
            firstChoice = div.children[0].className
        } else {
            secondChoice = div.children[0].className
            freezeDiv()
            checkChoices()
        }
        
    })
    
})

function checkChoices() {
    
    if(firstChoice === secondChoice) {
    
        resetChoices()
        
        let choices = document.querySelectorAll(".opened")
        
        choices.forEach(choice => {
        
            setTimeout(() => {
                choice.classList.remove("opened")
                choice.classList.add("discovered")
            }, 500)
            
            setTimeout(() => {
                if(winner() == true) {
                    resetGame()
                }
            }, 1500)
            
        })
        
    } else {
       
        resetChoices()
        
        let choices = document.querySelectorAll(".opened")
        
        choices.forEach(choice => {
            
            setTimeout(() => {
            
                choice.classList.remove('opened')
                choice.style.animation = 'turnBack .5s'
                setTimeout(() => {
                    choice.children[0].style.display = 'none'
                    choice.children[1].style.display = 'block'
                }, 250)
                freezeDiv()
                
                setTimeout(() => {
                    choice.style.animation = ''
                },500)
                
            }, 500)
            
        })
        
    }
    
}

function resetChoices() {
    firstChoice = ""
    secondChoice = ""
}

function winner() {
    
    let n = 0
    
    for(let x = 0; x < arrayDivs.length; x++) {
        if(arrayDivs[x].classList.contains("discovered")) {
            n++
        }
    }
    
    if(n == 18) return true
    
}

function freezeDiv() {
    mainContainer.classList.add("mainDisabled")
    setTimeout(() => {
        mainContainer.classList.remove("mainDisabled")
    }, 500)
}

function winDivAppears() {
    winDiv.style.display = 'flex'
    timer.style.display = 'block'
}



function waitingModeDisable() {
    mainContainer.classList.remove('waitingMode')
    title.classList.remove('waitingMode')
    timer.classList.remove('waitingMode')
}

function waitingMode() {
    mainContainer.classList.add('waitingMode')
    title.classList.add('waitingMode')
    timer.classList.add('waitingMode')
}

function hideGameMethods() {
    gameMethods.style.display = 'none'
}

function showGameMethods() {
    gameMethods.style.display = 'flex'
}

function resetCards(array) {
    array.forEach(element => {
        if(element.classList.contains('discovered')){
            element.classList.remove('discovered')
        }
        if(element.classList.contains('opened')) {
            element.classList.remove('opened')
        }
        element.children[0].style.display = 'none'
        element.children[1].style.display = 'block'
    })
}

function resetDiscoveredCards() {
    let discoveredCards = document.querySelectorAll('.discovered')
    
    resetCards(discoveredCards)
}

function resetOpenedCards() {
    let openedCards = document.querySelectorAll('.opened')
    
    resetCards(openedCards)
}

btnWithoutTimer.addEventListener('click', () => {
    waitingModeDisable()
    hideGameMethods()
    timer.style.display = 'none'
})

btnWithTimer.addEventListener('click', () => {

    waitingModeDisable()
    hideGameMethods()
    
    let time = 50
    
    let interval = setInterval(() => {
        
        time = time - 1
        timer.textContent = '00'+':'+time
        /*if(time >=1 && time <=9) {
            time = '0'+time
        }*/
        
       if(winner() == true) {
           time = time+5
           clearInterval(interval)
           if(loseDiv.style.display == 'flex') return
           setTimeout(() => {
               resetGame()
           }, 1500)
           return
       }
       
        setTimeout(() => {
            if(time == 0 && winner() == true) {
                time = time+5
                clearInterval(interval)
                if(loseDiv.style.display == 'flex') return
                setTimeout(() => {
                    resetGame()
                }, 1500)
            }
        }, 1000)
        
        setTimeout(() => {
            if(time == 0 && winner() != true) {
                time = time+5
                clearInterval(interval)
                setTimeout(() => {
                    timer.textContent = '00:50'
                    waitingMode()
                    resetOpenedCards()
                    resetDiscoveredCards()
                    if(winDiv.style.display == 'flex') return
                    loseDiv.style.display = 'flex'
                    shuffle()
                }, 1500)
            }
         }, 1000)
        
    },1000)
    
})

winBtn.addEventListener('click', () => {
    winDiv.style.display = 'none'
    showGameMethods()
})

loseBtn.addEventListener('click', () => {
    loseDiv.style.display = 'none'
    showGameMethods()
})

function resetGame() {
    timer.textContent = '00:50'
    waitingMode()
    winDivAppears()
    resetDiscoveredCards()
    shuffle()
}
