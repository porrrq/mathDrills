$(function () {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function displayTestingStatistics () {
        // Calculate & Display statistics result
        $('#timeUsed').text(`${Math.floor(timeUsed/60)}m ${timeUsed%60}s`)
        $('#totalProblem').text(totalProblem)
        $('#solved').text(solved)
        $('#miss').text(totalProblem-solved)
        $('#accuracy').text(`${Math.round(solved*10000/totalProblem)/100}%`)
        if (benford) {
            $('#probType').text("Benford's Law")
        }
        else {
            $('#probType').text("Uniform")
        }
    }
    function changePageTo (destination) {
        $('.page').each(function () {
            if ($(this).attr('id') == destination) {
                $(this).fadeIn() 
            }
            else {
                $(this).hide()
            }
        })
        currPage = destination
    }

    async function submit () {
        totalProblem += 1
        // Correct
        if (checkAnswer()) {
            solved += 1
            $('#problemText').text("Correct!").removeClass("bg-body-tertiary").addClass("alert alert-success")
        }
        // Wrong
        else {
            $('#problemText').text("Wrong!").removeClass("bg-body-tertiary").addClass("alert alert-danger")
        }
        await sleep(500)
        // clear class
        $('#problemText').removeClass("alert alert-success").removeClass("alert alert-danger").addClass("bg-body-tertiary")
        getDrill()
        // Clear old input
        $('#nx1').val('').focus()
        $('#nx2').val('')
        $('#c1').val('')
        $('#c2').val('')
    }

    async function timeControl () {
        $('#showTime').text(`Time left: ${Math.floor((timeLimit-timeUsed)/60)}m ${(timeLimit-timeUsed)%60}s`)
        while (timeUsed < timeLimit && currPage == 'drillPage') {
            // console.log("in loop")
            await sleep(1000)
            timeUsed += 1
            $('#showTime').text(`Time left: ${Math.floor((timeLimit-timeUsed)/60)}m ${(timeLimit-timeUsed)%60}s`)
        }
        if (currPage != 'resultPage') {
            displayTestingStatistics()
            changePageTo('resultPage')
        }
        return
    }


    // P(1) 
    $('#startButton').click(() => {
        // Time limit form validation
        if ($('#timeLimit').val() < 1 || $('#timeLimit').val() > 60 || $('#timeLimit').val() % 1 !== 0) {
            $('#formAlertMsg').slideDown()
            return
        }
        else {
            $('#formAlertMsg').hide()
            // console.log("#startButton is clicked")
            // Reset Statitics
            totalProblem = 0
            solved = 0
            timeUsed = 0
            // Indicate `probType`
            benford = $('#benford').prop("checked")
            // Create a problem
            getDrill()
            // Change page to `#drillContainer`
            changePageTo('drillPage')
            // Get a timeLimit
            timeLimit = Number($('#timeLimit').val())*60
            // Initiate timeControl()
            timeControl()
        }
        
    })
    // P(2) submitButton
    $('#submitButton').click(function () {submit()})
    // You can enter to submit
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
           submit();
        }
    });


    // P(2) leaveButton
    $('#leaveButton').click(() => {
        // console.log("#leaveButton is clicked")
        displayTestingStatistics()
        changePageTo('resultPage')
    })
    // P(3) backButton
    $('#backButton').click(() => {
        // console.log("#backButton is clicked")
        changePageTo('initialPage')
    })

})


