const initialContainer = document.getElementById("initialContainer")
const progressContainer = document.getElementById("progressContainer")
const resultContainer = document.getElementById("resultContainer")
const timeLimitElement = document.getElementById("timeLimit")
const startButton = document.getElementById("startButton")
const submitButton = document.getElementById("submitButton")
const leaveButton = document.getElementById("leaveButton")
const backButton = document.getElementById("backButton")
const showTimeLimit = document.getElementById("showTimeLimit")
let probType
let timeLimit
let totalProblem
let solved

const benfordProbabilities = [
    0,                // index 0 
    0.301,            // 1
    0.176,            // 2
    0.125,            // 3
    0.097,            // 4
    0.079,            // 5
    0.067,            // 6
    0.058,            // 7
    0.051,            // 8
    0.046             // 9
  ];

// function showResult () {
//     // Hide `progressContainer`
//     progressContainer.style.display = "none" 
//     // Show `resultContainer`
//     resultContainer.style.display = "block"
//     document.getElementById("timeUsed").innerText = timeLimit
//     document.getElementById("totalProblem").innerText = totalProblem
//     document.getElementById("solved").innerText = solved
//     document.getElementById("miss").innerText = totalProblem - solved
//     document.getElementById("accuracy").innerText = solved / totalProblem
//     if (probType) {
//         document.getElementById("probType").innerText = "Benford's Law"
//     }
//     else {
//         document.getElementById("probType").innerText = "Uniform"
//     }
// }

// startButton.addEventListener("click", () => {
//     // Assign a timeLimit to its valuable
//     timeLimit = timeLimitElement.value
//     console.log(`Time limit: ${timeLimit} minutes`)

//     // Reset all previous value
//     totalProblem = 0
//     solved = 0

//     // Clear the page and show the `progressContainer`
//     initialContainer.style.display = "none"
//     progressContainer.style.display = "block"

//     probType = document.getElementById("benfordCheckBox").checked
//     console.log(probType)
// })

// leaveButton.addEventListener("click", showResult)
// backButton.addEventListener("click", () => {
//     // Hide `resultContainer
//     resultContainer.style.display = "none"
//     // Restore the initial page
//     initialContainer.style.display = "block"
// })

const randInt = () => Math.floor(Math.random()*10)+1;
const randOper = () => {
    const r = Math.random();
    return r > 0.5 ? "+":"-"
};
const convert_num_to_string = (num) => {
    return num<0 ? `${num}`:`+${num}`
}
nx1 = randInt()
nx2 = randInt()
c1 = randInt()
c2 = randInt()
oper1 = randOper()
oper2 = randOper()


factored = `(${nx1}x${oper1}${c1})(${nx2}x${oper2}${c2})`
// Convert to the x^2 +cx + h format
cc1 = Number(oper1 + String(c1))
cc2 = Number(oper2 + String(c2))
p1 = nx1*nx2
p2 = nx1*cc2 + nx2*cc1
p3 = cc1*cc2
problem = `${p1}x²${convert_num_to_string(p2)}x${convert_num_to_string(p3)}`


console.log(`Factored: ${factored}`)
console.log(`Problem:  ${problem}`)


const probTextElement = document.getElementById("problemText");
probTextElement.innerText = problem


