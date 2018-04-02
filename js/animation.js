var Tcolor = "#00B268";
var Fcolor = "#FF3E1B";
var resetCounter = 0;



function blink(elem, color) {
    var count = 0;
    var t = setInterval(function () {
        elem.css("background-color", function () {
            count++;
            if (count>8 && !this.switch) {
                clearInterval(t);
            }
            this.switch = !this.switch
            return this.switch ? color : ""
        });
    }, 150)
}

function checkAnswer() {
    cauhoi = question[current];
    id = $(this).attr('id');
    check = id[id.length-1]
    console.log(check)
    if (check == cauhoi.answer) {
        blink($(this), Tcolor);
    }
    else {
        blink($(this), Fcolor);
    }
}

function startCounter() {
    var second = 30;
    var update = 100/(100*second);
    var elem = document.getElementById("bar"); 
    var width = 1;
    resetCounter = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100 || resetCounter) {
            clearInterval(id);
        } else {
            width += update; 
            elem.style.width = width + '%'; 
        }
    }
}

function showAnswer() {
    cauhoi = question[current];
    id = "#dapan-"+cauhoi.answer;
    blink($(id), Tcolor);
}

function reload() {
    $("#dapan-a").css("background-color", "");
    $("#dapan-b").css("background-color", "");
    $("#dapan-c").css("background-color", "");
    $("#dapan-d").css("background-color", "");
    $("#bar").css("width", "0%");
    resetCounter = 1;

}

function setQuestion(question) {
    $("#cauhoi").text(question.cauhoi);
    $("#qid").text("Câu hỏi " + (current+1) + ": ");
    $("#da-c").text(question.c);
    $("#da-b").text(question.b);
    $("#da-a").text(question.a);
    $("#da-d").text(question.d);
}

function nextQuestion() {
    if (current < question.length-1) {
        current++;
        setQuestion(question[current]);
        reload();
    }
}

function prevQuestion() {
    if (current>0) {
        current--;
        setQuestion(question[current]);
        reload();
    }
}

$(document).ready(function(){
    $("#start").click(startCounter);
    $("#show").click(showAnswer);
    $("#next").click(nextQuestion);
    $("#prev").click(prevQuestion);

    $("#dapan-a").click(checkAnswer);
    $("#dapan-b").click(checkAnswer);
    $("#dapan-c").click(checkAnswer);
    $("#dapan-d").click(checkAnswer);

    setQuestion(question[0]);
})

