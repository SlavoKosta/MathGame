const problemElement = document.querySelector(".problem")
const ourFrom = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")
const progressWrongBar = document.querySelector(".progress-wrong-inner")

let state = {
    score: 0,
    wrongAnswer: 0
}

function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML=`${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourField.value=""
    ourField.focus()
}

updateProblem()

function generateNumber(max){
    return Math.floor(Math.random()*(max +1))
}

function generateProblem(){
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ["+","-","x"][generateNumber(2)]
    }
}

ourFrom.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    
    let correctAnswer
    const p = state.currentProblem

    if(p.operator == "+") correctAnswer=p.numberOne + p.numberTwo
    if(p.operator == "-") correctAnswer=p.numberOne - p.numberTwo
    if(p.operator == "x") correctAnswer=p.numberOne * p.numberTwo

    if(parseInt(ourField.value, 10) === correctAnswer){
        state.score++
        pointsNeeded.textContent=10-state.score
        updateProblem()
        renderPregressBar()
    }else{
        state.wrongAnswer++
        mistakesAllowed.textContent=2-state.wrongAnswer
        problemElement.classList.add("animate-wrong")
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 331)
        renderProgressWrongBar()
    }
    checkLogic()
}

function checkLogic(){
    //If you won
    if(state.score === 10){
        endMessage.textContent="Congratulations, you won!"
        document.body.classList.add("overlay-is-open")
        resetButton.style = "background-color: rgba(0,0,255,0.8);"
        setTimeout(() => resetButton.focus(),451)
    }

    //If you lost
    if(state.wrongAnswer === 3){
        endMessage.textContent="Sorry, you lost!"
        document.body.classList.add("overlay-is-open")
        resetButton.style = "background-color: rgba(255,0,0,0.8);"
        setTimeout(() => resetButton.focus(),451)
    }
}

resetButton.addEventListener("click", resetGame)

function resetGame(){
    document.body.classList.remove("overlay-is-open")
    updateProblem()
    state.score = 0
    pointsNeeded.textContent=10
    state.wrongAnswer = 0
    mistakesAllowed.textContent=2
    renderPregressBar()
    renderProgressWrongBar()
}

function renderPregressBar(){
    progressBar.style.transform = `scaleX(${state.score / 10})`
}

function renderProgressWrongBar(){
    progressWrongBar.style.transform = `scaleX(${state.wrongAnswer / 3})`
}