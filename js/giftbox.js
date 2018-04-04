$(document).ready(function() {
    $(".giftbox").click(showGift);
});

function showGift() {
    $(this).css("background-color", "grey");
    id = $(this).attr("id");
    if (id=='g4' || id=='g6' || id=='g15') {
        $("#mygift").text("1 bịch bánh");
    } else if (id=='g9' || id=='g2') {
        $("#mygift").text("10 viên kẹo");
    } else {
        num = Math.floor(Math.random() * 5) + 3;
        $("#mygift").text(num + " viên kẹo");
    }
    $(this).prop('onclick',null).off('click');
}