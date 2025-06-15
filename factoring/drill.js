$(function () {
    function randInt(from, to) {
        // Using benford's distribution
        if (benford) {
          let i = Math.random();
          let cumulative = 0;
          for (let j = 1; j < benfordProbabilities.length; j++) {
            cumulative += benfordProbabilities[j];
            if (i <= cumulative) {
              return j;
            }
          }
          // fallback 
          return to;
        } else {
          return Math.floor(Math.random() * (to - from + 1)) + from;
        }
      }
      
    function randOperator () {
        if (Math.random() > 0.5) {
            return "+"
        }
        else {
            return "-"
        }
    }
    
    function genSolution () {
        // Number in front of X
        nx1 = randInt(1,9)
        nx2 = randInt(1,9)
        // Constant
        c1 = Number(randOperator() + randInt(1,9).toString())
        c2 = Number(randOperator() + randInt(1,9).toString())
    
        return { 
            [String(nx1)]: addSignAndToString(c1),
            [String(nx2)]: addSignAndToString(c2) 
        }
    }
    
    function addSignAndToString (num) {
        if (num > 0) {
            return `+${num}`
        }
        else if (num == 0) {
            return `+`
        } 
        else {
            return `${num}`
        }
    }
    
    function genProblem () {
        coefDegree2 = String(nx1 * nx2)
        coefDegree1 = addSignAndToString(nx1 * c2 + nx2 * c1)
        coefDegree0 = addSignAndToString(c1 * c2)
        return `${coefDegree2}X²${coefDegree1}X${coefDegree0}`
    }
    
    window.getDrill = function () {
        solution = genSolution()
        $('#problemText').text(genProblem())
        console.log(solution)
    }

    window.checkAnswer = function () {
        let answers = []
        $('.answerInp').each(function () {
            answers.push($(this).val())
        })
        // console.log("Answer", answers)
        // console.log(JSON.stringify(answers) === JSON.stringify(solution))
        return (solution[answers[0]] == answers[1] && solution[answers[2]] == answers[3])
    }
    
    
})

