var Tcolor = "#00B268";
var Fcolor = "#FF3E1B";
var resetCounter = 0;
var opened = 0;
var chooseable = 0;



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
    if (chooseable) {
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
    $("#da-a").text("");
    $("#da-b").text("");
    $("#da-c").text("");
    $("#da-d").text("");
    opened = 0;
    chooseable = 0;
}

function openAnswer() {
    q = question[current];
    if (opened < 4) {
        if (opened == 0)
            $("#da-a").text(q.a);
        if (opened == 1)
            $("#da-b").text(q.b);
        if (opened == 2)
            $("#da-c").text(q.c);
        if (opened == 3) {
            $("#da-d").text(q.d);
            chooseable = 1;
        }   
        opened++;    
    }
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
    $("#openda").click(openAnswer);

    $("#dapan-a").click(checkAnswer);
    $("#dapan-b").click(checkAnswer);
    $("#dapan-c").click(checkAnswer);
    $("#dapan-d").click(checkAnswer);

    setQuestion(question[0]);
})

